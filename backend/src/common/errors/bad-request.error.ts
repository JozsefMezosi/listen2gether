import { HTTP_STATUS_CODES } from '../model';
import { ApiError } from './api.error';

export class BadRequest extends ApiError {
  readonly name = 'BadRequest';

  constructor(message?: string) {
    super(message || 'Bad request.', HTTP_STATUS_CODES.Forbidden);
  }
}
