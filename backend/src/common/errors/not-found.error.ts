import { HTTP_STATUS_CODES } from '../model';
import { ApiError } from './api.error';

export class NotFound extends ApiError {
  readonly name = 'NotFound';

  constructor(message?: string) {
    super(message || 'Not found.', HTTP_STATUS_CODES.Forbidden);
  }
}
