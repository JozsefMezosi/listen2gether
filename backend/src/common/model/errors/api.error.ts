import { HTTP_STATUS_CODES, HTTP_STATUS_CODES_TYPE } from '../http';

export class ApiError implements Error {
  readonly name: string = 'Api-error';
  constructor(
    // eslint-disable-next-line no-unused-vars
    readonly message: string,
    // eslint-disable-next-line no-unused-vars
    readonly statusCode: (typeof HTTP_STATUS_CODES)[HTTP_STATUS_CODES_TYPE]
  ) {}
}
