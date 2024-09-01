import { useIsSsr } from "@/app/hooks/useIsSsr";
import { getUser } from "@/utils/get-user";

export const UserName = () => {
    const isSsr = useIsSsr();

    if (isSsr)
        return (
            <div className="animate-pulse rounded w-[12.05rem] py-2 hover:bg-slate-100 flex justify-between bg-slate-400" />
        );

    const user = getUser();
    if (!user) return null;

    return <p>{user.name}</p>;
};
