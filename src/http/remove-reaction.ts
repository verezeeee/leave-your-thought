interface removeReactionRequest {
    id: string;
    messageId: string;
}

export async function removeReaction({ id, messageId }: removeReactionRequest) {
    await fetch(
        `${import.meta.env.VITE_APP_API_URL}/api/rooms/${id}/messages/${messageId}/react`,
        {
            method: "DELETE",
        }
    );
}
