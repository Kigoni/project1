"use client";

import { useState, useRef, useEffect } from "react";
import ChatLogItem from "./components/chat/ChatLogItem";
import TypingAnimation from "./components/chat/TypingAnimation";
import axiosChat from "./api/axiosChat";
import { ChatCompletion } from "./data/chatData";
import toast from "react-hot-toast";
import React from "react";
import { BotMessageSquare, MessageCircle, Send, X } from "lucide-react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";

interface ChatMessage {
  type: "user" | "bot";
  message: string;
}

type ChatBotProps = {
  title: string;
  subtitle: string;
  botName: string;
  welcomeMessage: string;
  aiModel?: string;
};

const ChatBot: React.FC<ChatBotProps> = ({
  title,
  subtitle,
  botName,
  welcomeMessage,
  aiModel,
}) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [chatLog, setChatLog] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputValue.trim() === "") {
      toast.error("Please enter a message");
      return;
    }

    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { type: "user", message: inputValue },
    ]);

    sendMessage(inputValue);
    setInputValue("");
  };

  const sendMessage = (message: string) => {
    const URL = "/completions";

    const data = {
      model: aiModel ? aiModel : "mistralai/mistral-7b-instruct:free",
      messages: [{ role: "user", content: message }],
    };

    setIsLoading(true);

    axiosChat<ChatCompletion>({ method: "POST", url: URL, data: data })
      .then((response) => {
        setChatLog((prevChatLog) => [
          ...prevChatLog,
          { type: "bot", message: response.choices[0].message.content },
        ]);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [isLoading]);

  return (
    <>
      <div>
        {/* Chat Button */}
        <button
          id="chatbot"
          className={`z-[500] is-lunar-green fixed bottom-4 right-4 inline-flex items-center justify-center text-sm font-medium border rounded-full w-11.2 h-11.2 m-0 cursor-pointer border-gray-200 bg-none ${
            isChatOpen ? "chat-open" : "chat-closed"
          }`}
          type="button"
          aria-haspopup="dialog"
          aria-expanded={isChatOpen}
          onClick={toggleChat}
        >
          <MessageCircle className="w-7 h-7 text-yellow-500 hover:text-green-800" />
        </button>

        {/* Chat Window */}
        {isChatOpen && (
          <div
            id="hs-chatbot-container"
            className={`fixed bottom-[calc(2.8rem+1.05rem)] right-0 mr-2.8 bg-yellow-50 border-r-2 border border-gray-200 rounded-xl w-[308px] h-[420px] z-[500] ${
              isChatOpen ? "chat-open" : "chat-closed"
            }`}
          >
            {/* Heading */}
            <div className="flex justify-between items-center space-y-1.05 p-4.2 rounded-t-xl bg-background border-b">
              <div className="flex flex-row">
                <span className="flex-shrink-0 mr-2.8 inline-flex items-center justify-center size-9.8 rounded-full bg-primary">
                  <span className="font-medium text-white leading-none">
                    <BotMessageSquare className="w-7 h-7" />
                  </span>
                </span>
                <div>
                  <h2 className="font-semibold text-lg text-primary tracking-tight">
                    {title}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1.4">
                    {subtitle}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={toggleChat}
                className="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center h-5.6 w-5.6 rounded-md text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-primary transition-all dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
                data-hs-overlay="#hs-focus-management-modal"
              >
                <span className="sr-only">Close</span>
                <X />
              </button>
            </div>

            {/* Chat Container */}
            <div id="hs-message-container" className="px-4.2 pb-5.6">
              <div
                ref={chatContainerRef}
                id="chat-container"
                className="pr-2.8 h-[280px]"
                style={{
                  minWidth: "100%",
                  overflowY: "scroll",
                }}
              >
                <div className="flex gap-2.1 my-2.8 text-gray-600 text-sm flex-1">
                  <span className="flex-shrink-0 inline-flex items-center justify-center h-4.7 w-4.7 rounded-full bg-primary">
                    <span className="text-sm font-medium text-white leading-none">
                      <BotMessageSquare />
                    </span>
                  </span>

                  <p className="leading-relaxed">
                    <span className="block font-bold text-muted-foreground">
                      {botName}
                    </span>
                    <p className="text-sm text-foreground">{welcomeMessage}</p>
                  </p>
                </div>

                {chatLog.map((message, index) => (
                  <ChatLogItem
                    key={index}
                    type={message.type}
                    message={message.message}
                    botName={botName}
                  />
                ))}

                {isLoading && (
                  <div key={chatLog.length} className="flex justify-start">
                    <div className="bg-gray-200 rounded-lg p-2.8 text-white max-w-sm">
                      <TypingAnimation />
                    </div>
                  </div>
                )}
              </div>

              {/* Input Box */}
              <div className="flex items-center pt-0">
                <form
                  className="flex items-center justify-center w-full space-x-1.4"
                  onSubmit={handleSubmit}
                >
                  <Input
                    className="flex h-7 w-full rounded-md"
                    placeholder="Type your message"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <Button variant={"outline"} className="text-primary" type="submit">
                    <Send />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatBot;
// Button Size:

// Reduced w-16 and h-16 to w-12.8 and h-12.8.
// Adjusted the icon size from size-10 to w-8 h-8.
// Chat Container:

// Reduced w-[440px] to w-[352px] and h-[600px] to h-[480px].
// Adjusted spacing (px-6, pb-8, etc.) proportionally.