import {Suspense} from "react";
import {Share2} from "lucide-react";
import {toast} from "sonner";
import {Messages} from "../components/messages.tsx";
import {CreateMessageForm} from "../components/create-message-form.tsx";

function Room() {

    function handleShareRoom() {
        const url = window.location.href.toString();

        if (!(navigator.share !== undefined && navigator.canShare())) {
            navigator.clipboard.writeText(url);

            toast.info("The room URL has been copied to the clipboard!");
        } else {
            navigator.share({url});
        }
    }

    return (
        <div className="mx-auto max-w-[640px] flex flex-col gap-6 py-10 px-4">
            <span className="font-bold text-3xl text-center">Leave Your Thought! 💬</span>
            <div className="flex items-center justify-center gap-3 px-3">
                <button
                    onClick={handleShareRoom}
                    type="submit"
                    className="bg-zinc-800 text-zinc-300 px-3 py-1.5 gap-1.5 flex items-center rounded-lg font-medium text-sm hover:bg-zinc-700 transition-colors"
                >
                    Compartilhar
                    <Share2 className="size-4" />
                </button>
            </div>

            <div className="h-px w-full bg-zinc-900" />

            <CreateMessageForm />

            <Suspense fallback={<p>Loading...</p>}>
                <Messages />
            </Suspense>
        </div>
    );
}

export default Room
