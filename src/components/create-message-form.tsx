import { ArrowRight } from "lucide-react";
import { createMessage } from "../http/create-message";
import { toast } from "sonner";
import {useState} from "react";

export const CreateMessageForm = () => {
    const id = import.meta.env.VITE_APP_ROOM_ID;
    const [message, setMessage] = useState("");

    if (!id) {
        throw new Error(
            "Messages components must be rendered inside a room route."
        );
    }

    async function createMessageFunction(event: { preventDefault: () => void; }) {
        event.preventDefault();

        if (!message) {
            toast.error("A Mensagem não pode estar vazia.");
            return;
        }

        try {
            await createMessage({ id, message }).then(() => {
                setMessage("");
                toast.success("Mensagem criada com sucesso!");
            })
        } catch (error) {
            toast.error("Um erro ocorreu criando a mensagem.");
            console.log(error);
        }
    }

    return (
        <form
            onSubmit={createMessageFunction}
            className="flex items-center gap-2 bg-zinc-900 p-2 rounded-xl border border-zinc-800 ring-orange-400 ring-offset-4 ring-offset-zinc-950 focus-within:ring-1"
        >
            <input
                type="text"
                name="message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Qual a sua pergunta?"
                autoComplete="off"
                className="flex-1 text-sm bg-transparent mx-2 outline-none text-zinc-100 placeholder:text-zinc-500"
            />

            <button
                type="submit"
                className="bg-orange-400 text-orange-950 px-3 py-1.5 gap-1.5 flex items-center rounded-lg font-medium text-sm hover:bg-orange-500 transition-colors"
            >
                Criar pergunta
                <ArrowRight className="size-4" />
            </button>
        </form>
    );
};
