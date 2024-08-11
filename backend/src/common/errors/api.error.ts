import { HTTP_STATUS_CODES, HTTP_STATUS_CODES_TYPE } from '../model';

export class ApiError implements Error {
  readonly name: string = 'Api-error';
  constructor(
    readonly message: string,
    readonly statusCode: (typeof HTTP_STATUS_CODES)[HTTP_STATUS_CODES_TYPE],
  ) {}
}
