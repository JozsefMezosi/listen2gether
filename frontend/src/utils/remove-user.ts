import Cookies from "js-cookie";

export const removeUser = () => {
    Cookies.remove("user");
};
