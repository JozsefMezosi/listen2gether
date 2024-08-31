export const HTTP_STATUS_CODES = {
    OK: 200,
    Created: 201,
    Accepted: 202,
    'Bad Request': 400,
    Unauthorized: 401,
    Forbidden: 403,
    'Not Found': 404,
    'Internal Server Error': 500,
} as const;

export type HTTP_STATUS_CODES_TYPE = keyof typeof HTTP_STATUS_CODES;
