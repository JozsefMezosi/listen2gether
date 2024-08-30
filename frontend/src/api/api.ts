"use client";

//todo create openapi contract
export const fetchApi = async (path: string, init?: RequestInit) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${path.startsWith("/") ? path.slice(1) : path}`,
    init,
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error);
  }

  const data = await response.json();

  return { ...response, data };
};
