interface CreateMessageRequest {
    id: string;
    message: string;
}

export async function createMessage({ id, message }: CreateMessageRequest) {
    const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/api/rooms/${id}/messages`,
        {
            method: "POST",
            body: JSON.stringify({
                message,
            }),
        }
    );

    const data: { id: string } = await response.json();

    return { messageId: data.id };
}
