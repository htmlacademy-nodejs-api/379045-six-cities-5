export const CreateCommentMessages = {
  text: {
    required: { msg: 'text is required' },
    length: { msg: 'min length is 5, max is 2024'}
  },
  offerId: {
    id: { msg: 'offerId field must be a valid id'}
  },
  rating: {
    int: { msg: 'rating must be an integer value' },
    min: { msg: 'rating min count is 1' },
    max: { msg: 'rating max count is 5' }
  },
} as const;
