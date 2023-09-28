export const userTypes = ['standard', 'pro'] as const;

export type UserType = typeof userTypes[number];

export type User = {
  name: string;
  email: string;
  avatar: string;
  password: string;
  type: UserType;
}
