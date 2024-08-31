import { CreateRoom } from "@/components/rooms/create-room";

export default async function Home() {
    return (
        <div className="max-w-[70rem] m-auto">
            <div className="flex justify-between">
                <h1 className="text-2xl">Rooms</h1>
                <CreateRoom />
            </div>
        </div>
    );
}
