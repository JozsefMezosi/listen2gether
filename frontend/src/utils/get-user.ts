import { USER_COOKIE_KEY, User } from "@/models/user";
import Cookies from "js-cookie";

export const getUser = (): User | undefined => {
    const user = Cookies.get(USER_COOKIE_KEY);
    if (!user) return undefined;

    return JSON.parse(user);
};
