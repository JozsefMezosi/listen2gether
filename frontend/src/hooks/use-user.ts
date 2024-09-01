import Cookies from "js-cookie";

export type User = {
    id: number;
    email: string;
};

export const useUser = (): User => {
    const user = Cookies.get("user");
    if (!user) throw new Error("User cannot be found.");

    return JSON.parse(user);
};
