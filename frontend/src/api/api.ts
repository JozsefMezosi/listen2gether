export const fetchApi = (path: string, init?: RequestInit) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/${path.startsWith("/") ? path.slice(1) : path}`, init);
};

