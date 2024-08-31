export const getExprationDate = (jwtTokenExpInSeconds: number) => {
    const now = new Date();

    return new Date(now.getTime() + jwtTokenExpInSeconds * 1000);
};
