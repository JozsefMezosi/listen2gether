import { User } from "@/models/user";
import Cookies from "js-cookie";

export const getUser = (): User => {
    const user = Cookies.get("user");
    if (!user) throw new Error("User not found.");

    return JSON.parse(user);
};
