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
  },
}, {
  timestamps: true,
});

UserSchema.set('toJSON', { versionKey: false, transform: (doc, ret, options) => {
  delete ret.password;
  return ret;
}})

const Users = mongoose.model('Users', UserSchema, 'Users');

export { Users, UserSchema };
