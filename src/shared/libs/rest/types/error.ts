export type ValidationErrorField = {
  property: string;
  value: string;
  messages: string[];
};

export enum AppError {
  ValidationError = 'VALIDATION_ERROR',
  CommonError = 'COMMON_ERROR',
  ServiceError = 'SERVICE_ERROR',
}
