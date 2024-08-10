import { HTTP_STATUS_CODES } from '../http';
import { ApiError } from './api.error';

export class Unauthorized extends ApiError {
  readonly name = 'Unauthorized';

  constructor() {
    super('Unauthorized', HTTP_STATUS_CODES.Forbidden);
  }
}
