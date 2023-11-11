
export const OfferMessages = {
  userId: { msg: 'userId must be a valid mongo document id' },
  title: { msg: 'the title should have a length of 10 to 100'},
  description: { msg: 'the description should have a length of 20 to 1024'},
  city: { msg: 'city must be only one of the following: "Paris", "Cologne", "Brussels", "Amsterdam", "Hamburg", "Dusseldorf"'},
  preview: { msg: 'preview must be a valid image file'},
  photos: {
    arr: { msg: '"images" field must be an array' },
    arrSize: { msg: '"images" field must contain 6 image files' }
  },
  premium: { msg: '"premium" field must be a boolean' },
  type: { msg: 'offer type must be only one of the following: "apartment", "house", "room", "hotel"' },
  roomsCount: {
    int: { msg: 'roomsCount must be an integer value' },
    min: { msg: 'roomsCount min count is 1' },
    max: { msg: 'roomsCount max count is 8' }
  },
  guestsCount: {
    int: { msg: 'guestsCount must be an integer value' },
    min: { msg: 'guestsCount min count is 1' },
    max: { msg: 'guestsCount max count is 10' }
  },
  price: {
    int: { msg: 'price must be an integer value' },
    min: { msg: 'price min count is 100' },
    max: { msg: 'price max count is 100_000' }
  },
  comforts: {
    arr: { msg: 'field "comforts" must be an array' },
    enum: { msg: 'each item in "comforts" array must be one of the following: "Breakfast", "Air conditioning", "Laptop", "Friendly workspace", "Baby seat", "Washer", "Towels", "Fridge"' },
    arrUnique: { msg: 'all items in "comforts" array must be unique' },
    minSize: { msg: 'the "comforts" field must have at least one value' }
  },
  coords: {
    isObject: { msg: 'coords must be an object with fields: "latitude", "longitude"' }
  }

} as const;
