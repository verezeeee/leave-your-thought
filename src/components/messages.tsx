import { Message } from "./message";
import {getRoomMessages} from "../http/get-room-messages";
import {useSuspenseQuery} from "@tanstack/react-query";
import {useMessagesWebsockets} from "../hooks/use-messages-websockets.ts";

export function Messages() {
    const id = import.meta.env.VITE_APP_ROOM_ID;
    const { data } = useSuspenseQuery({
        queryKey: ["messages", id],
        queryFn: () => getRoomMessages({ id }),
    });

    useMessagesWebsockets({ id });

    const sortedMessages = data.messages.sort((a, b) => {
        return b.amountOfReactions - a.amountOfReactions;
    })

    return (
        <ol className="list-decimal list-outside px-3 space-y-8">
            {sortedMessages.map((message) => (
                <Message
                    key={message.id}
                    text={message.text}
                    id={message.id}
                    amountOfReactions={message.amountOfReactions}
                    answered={message.answered}
                />
            ))}
        </ol>
    );
}
