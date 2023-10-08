export const Component = {
  RestApp: Symbol.for('RestApp'),
  Logger: Symbol.for('Logger'),
  Config: Symbol.for('Config'),
  DatabaseClient: Symbol.for('DatabaseClient'),
  UserModel: Symbol.for('UserModel'),
  UserService: Symbol.for('UserService')
} as const;
