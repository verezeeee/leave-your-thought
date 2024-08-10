interface ReactToMessageRequest {
    id: string;
    messageId: string;
}

export async function reactToMessage({ id, messageId }: ReactToMessageRequest) {
    await fetch(
        `${import.meta.env.VITE_APP_API_URL}/api/rooms/${id}/messages/${messageId}/react`,
        {
            method: "PATCH",
        }
    );
}
