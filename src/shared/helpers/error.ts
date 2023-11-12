import { ValidationError } from 'class-validator';
import { AppError, ValidationErrorField } from '../libs/rest/index.js';

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '';
}

export function createErrorObject(errorType: AppError, error: string, details: ValidationErrorField[] = []) {
  return { errorType, error, details };
}

export function reduceValidationErrors(errors: ValidationError[]): ValidationErrorField[] {
  return errors.map(({ property, value, constraints }) => ({
    property,
    value,
    messages: constraints ? Object.values(constraints) : []
  }));
}
