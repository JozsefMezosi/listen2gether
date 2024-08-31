import { Api } from "./api.types";

export const api = new Api({ baseUrl: process.env.NEXT_PUBLIC_API_URL });
