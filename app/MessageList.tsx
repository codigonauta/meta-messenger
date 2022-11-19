"use client";

import { useEffect } from "react";
import useSWR from "swr";
import { clientPusher } from "../pusher";
import { Message } from "../types";
import fetcher from "../utils/fetchMessages";
import MessageComponent from "./MessageComponent";

function MessageList() {
  const { data: messages, error, mutate } = useSWR("/api/getMessages", fetcher);

  useEffect(() => {
    const channel = clientPusher.subscribe("messages");

    channel.bind("new-message", (data: Message) => {
      // if you send the message, no need to update
      if (messages?.find(message => message.id === data.id)) return

      if (!messages) {
        mutate(fetcher)
      } else {
        mutate(fetcher, {
          optimisticData: [data, ...messages!],
          rollbackOnError: true,
        });
      }
    });

    return () => {
      channel.unbind_all()
      channel.unsubscribe()
    }
  }, [messages, mutate, clientPusher]);

  return (
    <div className="pt-8 pb-32 space-y-5 ">
      {messages?.map((message) => {
        return (
          <MessageComponent
            key={message.id}
            message={message}
            isUser={message.username === "Elon Musk"}
          />
        );
      })}
    </div>
  );
}

export default MessageList;
