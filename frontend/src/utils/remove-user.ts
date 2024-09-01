import { USER_COOKIE_KEY } from "@/models/user";
import Cookies from "js-cookie";

export const removeUser = () => {
    Cookies.remove(USER_COOKIE_KE);
};
