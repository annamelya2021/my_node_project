import mongoose from 'mongoose';
import User from '../src/models/userModel';

describe('User Model', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create and save a new user successfully', async () => {
    const userData = {
      email: 'test@example.com',
      username: 'testuser',
      password: 'test123',
      role: 'user',
    };

    const validUser = new User(userData);
    const savedUser = await validUser.save();

    // Verify that the saved user has the correct properties
    expect(savedUser._id).toBeDefined();
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.username).toBe(userData.username);
    expect(savedUser.role).toBe(userData.role);
  });

  it('should fail to save a user with invalid data', async () => {
    const invalidUserData = {
      // Missing required 'email' field
      username: 'testuser',
      password: 'test123',
      role: 'user',
    };

    const invalidUser = new User(invalidUserData);

    // Attempt to save the user without the required 'email' field
    let error;
    try {
      await invalidUser.save();
    } catch (err) {
      error = err;
    }

    // Verify that an error was thrown
    expect(error).toBeDefined();
    expect(error.errors.email).toBeDefined();
  });
});
