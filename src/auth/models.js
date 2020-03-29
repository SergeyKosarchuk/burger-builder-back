import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: Number,
  created: {
    type: Date,

  }
}, {
  timestamps: true,
});

const Users = mongoose.model('Users', UserSchema, 'Users');

export { Users };
