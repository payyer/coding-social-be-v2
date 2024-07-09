import { IoMdSend } from "react-icons/io";
import { BsImage } from "react-icons/bs";
import { useGetChatRoomsQuery } from "../../reduce/chatRoom/chatRoomApi";
import { ChatBubbleStart } from "../../components/ChatBubbleStart";
import { ChatBubbleEnd } from "../../components/ChatBubbleEnd";
import {
  useCreateMessageMutation,
  useGetMessagesQuery,
} from "../../reduce/messages/messageApi";
import { useParams } from "react-router-dom";
import { ListChat } from "./ListChat/ListChat";
import { SubmitHandler, useForm } from "react-hook-form";
import { ICreateMessage, IMessage } from "../../type/messages";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io("http://localhost:8000/");
socket.on("connect", () => {
  console.log(socket.id);
});
export const Message = () => {
  const { chatRoomId } = useParams();
  const { data: ListRoomChat } = useGetChatRoomsQuery();
  const { data: GetMessages, refetch } = useGetMessagesQuery(chatRoomId ?? "");
  const [createMessage] = useCreateMessageMutation();
  const userId = localStorage.getItem("userId");

  const [newMessage, setNewMessage] = useState<IMessage[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateMessage>();
  const onSubmit: SubmitHandler<ICreateMessage> = (data) => {
    createMessage(data)
      .then((result) => {
        socket.emit("sendMessage", { userId, chatRoomId, text: data.text });
        console.log({ result });
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  useEffect(() => {
    socket.emit("joinRoom", { userId, chatRoomId });

    socket.on("receiveMessage", ({ _id, senderId, text }) => {
      console.log({ _id, senderId, text });
      const newObjectMessage = { _id, senderId, text };
      setNewMessage((prevMessages) => [...prevMessages, newObjectMessage]);
    });
    return () => {
      socket.off("receiveMessage");
    };
  }, [chatRoomId, userId, refetch]);

  return (
    <section className="flex w-full pt-nav-height mx-auto h-screen">
      {/* Left side */}
      <div className="w-[320px] p-4 overflow-y-scroll scrollbar-thin scrollbar-thumb-primary scrollbar-track-secondary">
        {ListRoomChat?.metadata.map((item) => {
          return <ListChat key={item._id} chatItem={item} />;
        })}
      </div>

      {/* Right side */}
      <div className="flex flex-col w-full flex-1 p-4 ">
        {/* Chat box */}
        <div className="flex-1 pb-4">
          {GetMessages &&
            GetMessages.metadata.map((item) => {
              if (item.senderId == localStorage.getItem("userId")) {
                return <ChatBubbleEnd key={item._id} message={item.text} />;
              }
              return <ChatBubbleStart key={item._id} message={item.text} />;
            })}
          {newMessage.map((message) => {
            if (message.senderId == localStorage.getItem("userId")) {
              return <ChatBubbleEnd key={message._id} message={message.text} />;
            }
            return <ChatBubbleStart key={message._id} message={message.text} />;
          })}
        </div>
        {/* Chat box input */}
        <div className="">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-center gap-2"
            action=""
          >
            <input
              className={`flex-1 bg-secondary rounded-md p-2 outline-none focus:border-primary focus:border 
               ${errors.text ? "focus:border-red-400" : ""}`}
              type="text"
              {...register("text", { required: true })}
            />

            <label htmlFor="file">
              <BsImage className="text-3xl cursor-pointer" />
            </label>
            <input hidden type="file" id="file" {...register("file")} />
            <input
              hidden
              type="text"
              value={chatRoomId}
              {...register("chatRoomId")}
            />

            <label htmlFor="submit">
              <IoMdSend className="text-3xl cursor-pointer" />
            </label>
            <input hidden id="submit" type="submit" />
          </form>
        </div>
      </div>
    </section>
  );
};
