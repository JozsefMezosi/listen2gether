import { LogoutButton } from "./logout-button";
import { UserNavItem } from "./user-nav-item";

export const RightNavGroup = () => {
    return (
        <div className="flex gap-2">
            <UserNavItem />
            <LogoutButton />
        </div>
    );
};
