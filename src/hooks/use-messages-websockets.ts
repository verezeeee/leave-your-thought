import {useEffect} from "react";
import {GetRoomMessagesResponse} from "../http/get-room-messages.ts";
import {queryClient} from "../lib/react-query.ts";

interface UseMessagesWebsocketsParams {
    id: string;
}

type WebHookMessage =
    | { kind: "message_created"; value: {
            answered: boolean;
            id: string;
            message: string }; }
    | { kind: "message_answered"; value: {
            id: string;
    }; }
    | { kind: "message_reaction_increased" | "message_reaction_decreased"; value: {
            id: string;
            count: number;
    }; }

export function useMessagesWebsockets({id}: UseMessagesWebsocketsParams) {
    useEffect(() => {
        const ws = new WebSocket(`ws://localhost:8080/subscribe/${id}`);

        ws.onopen = () => {
            console.log("Conectado");
        }

        ws.onclose = () => {
            console.log("Desconectado");
        }

        ws.onmessage = (event) => {
            const data: WebHookMessage = JSON.parse(event.data);

            switch (data.kind) {
                case "message_created": {
                    queryClient.setQueryData<GetRoomMessagesResponse>(["messages", id], state => {
                        return {
                            messages: [...(state?.messages ?? []), {
                                id: data.value.id,
                                text: data.value.message,
                                amountOfReactions: 0,
                                answered: data.value.answered,
                            }
                            ]
                        }
                    });
                    break;
                }
                case "message_answered": {
                    queryClient.setQueryData<GetRoomMessagesResponse>(["messages", id], state => {
                        if (!state) {
                            return undefined;
                        }

                        return {
                            messages: state.messages.map((item) => {
                                if (item.id === data.value.id) {
                                    return {
                                        ...item,
                                        answered: true,
                                    }
                                }
                                return item;
                            })
                        }
                    });
                    break;
                }
                case "message_reaction_increased":
                case "message_reaction_decreased": {
                    queryClient.setQueryData<GetRoomMessagesResponse>(["messages", id], state => {
                        if (!state) {
                            return undefined;
                        }

                        return {
                            messages: state.messages.map((item) => {
                                if (item.id === data.value.id) {
                                    return {
                                        ...item,
                                        amountOfReactions: data.value.count,
                                    }
                                }
                                return item;
                            })
                        }
                    });
                    break;
                }
            }
        }

        return () => {
            ws.close();
        }
    }, [id, queryClient])
}