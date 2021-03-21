import { UserInputError } from 'apollo-server';

import User from '../../models/User';
import { validateLoginInput, validateRegisterInput } from '../../utils/validators';

const usersResolvers = {
  Mutation: {
    async login(_, { username, password }) {
      const { valid, errors } = validateLoginInput(username, password);
      if (!valid) throw new UserInputError('Errors', { errors });

      const user = await User.findOne({ username });
      if (!user) {
        errors.general = 'User not found';
        throw new UserInputError(errors.general, { errors });
      }

      const match = await user.validatePassword(password);
      if (!match) {
        errors.general = 'Wrong credentials';
        throw new UserInputError(errors.general, { errors });
      }

      const token = user.generateAuthToken();

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
      // Validate user data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) throw new UserInputError('Errors', { errors });

      // Make sure user doesnt already exist
      const user = await User.findOne({ username });
      if (user)
        throw new UserInputError('Username is taken', {
          errors: {
            username: 'This username is taken',
          },
        });

      const newUser = new User({
        username,
        email,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();
      const token = newUser.generateAuthToken();

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};

export default usersResolvers;
