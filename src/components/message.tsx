import { ArrowUp } from "lucide-react";
import { useState } from "react";
import {toast} from "sonner";
import {reactToMessage} from "../http/react-to-message.ts";
import {removeReaction} from "../http/remove-reaction.ts";

interface MessageProps {
    text: string;
    amountOfReactions: number;
    answered?: boolean;
    id: string;
}

export function Message({text, id: messageId, amountOfReactions, answered = false}: MessageProps) {
    const [hasReacted, setHasReacted] = useState(false);
    const id = import.meta.env.VITE_APP_ROOM_ID;
    async function handleReactToMessage() {
        try {
            await reactToMessage({id, messageId});
        }catch (error) {
            toast.error("Um erro ocorreu reagindo a mensagem.");
            console.error(error);
        }
        setHasReacted(true);
    }

    async function handleRemoveReaction() {
        try {
            await removeReaction({id, messageId});
        } catch (error) {
            toast.error("Um erro ocorreu removendo a reação.");
            console.error(error);
        }
        setHasReacted(false);
    }

    return (
        <li
            data-answered={answered}
            className="ml-4 leading-relaxed text-zinc-100 data-[answered=true]:opacity-50 data-[answered=true]:pointer-events-none"
        >
            {text}
            {hasReacted ? (
                <button
                    onClick={handleRemoveReaction}
                    type="button"
                    className="mt-3 flex items-center gap-2 text-orange-400 text-sm font-medium hover:text-orange-500"
                >
                    <ArrowUp className="size-4" />
                    Curtir pergunta ({amountOfReactions})
                </button>
            ) : (
                <button
                    onClick={handleReactToMessage}
                    type="button"
                    className="mt-3 flex items-center gap-2 text-zinc-400 text-sm font-medium hover:text-zinc-500"
                >
                    <ArrowUp className="size-4" />
                    Curtir pergunta ({amountOfReactions})
                </button>
            )}
        </li>
    );
}
