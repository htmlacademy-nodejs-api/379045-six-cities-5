
export const UserMessages = {
  name: {
    required: { msg: 'username is required' },
    length: { msg: 'the name should have a length of 10 to 15' },
  },
  email: { msg: 'email must be valid' },
  avatar: { msg: 'avatar must be a valid image file' },
  password: {
    required: { msg: 'password is required' },
    length: { msg: 'the name should have a length of 6 to 12' },
  },
  type: {
    msg: 'user status must be either "pro" or "обычный"'
  }

};
