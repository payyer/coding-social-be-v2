import { FaXmark } from "react-icons/fa6";
import { Avatar } from "../Avatar";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import { isOpenChat } from "../../reduce/home/homeSlice";
import { ChatBubbleEnd } from "../ChatBubbleEnd";
import { ChatBubbleStart } from "../ChatBubbleStart";
import {
  useCreateMessageMutation,
  useGetMessagesQuery,
} from "../../reduce/messages/messageApi";
import { IoMdSend } from "react-icons/io";
import { ICreateMessage, IMessage } from "../../type/messages";
import { SubmitHandler, useForm } from "react-hook-form";
import io from "socket.io-client";
import { useEffect, useState, useCallback } from "react";

const socket = io("http://localhost:8000/");
socket.on("connect", () => {
  console.log(socket.id);
});

export const ChatBox = () => {
  const dispatch = useAppDispatch();
  const [createMessage] = useCreateMessageMutation();
  const openChatBox = useAppSelector(
    (state: RootState) => state.home.openChatBox
  );

  const chatRoomId = useAppSelector(
    (state: RootState) => state.home.chatRoomId
  );
  const user_avartar = useAppSelector(
    (state: RootState) => state.home.user_avartar
  );
  const user_name = useAppSelector((state: RootState) => state.home.user_name);

  const [newMessage, setNewMessage] = useState<IMessage[]>([]);

  const { data: GetMessages, refetch } = useGetMessagesQuery(chatRoomId ?? "");

  const userId = localStorage.getItem("userId");

  const { register, handleSubmit, reset } = useForm<ICreateMessage>();

  // Function to handle the form submission
  const onSubmit: SubmitHandler<ICreateMessage> = (data) => {
    console.log({ data, chatRoomId });
    createMessage({
      chatRoomId: chatRoomId ?? "",
      file: data.file,
      text: data.text,
    })
      .then((result) => {
        socket.emit("sendMessage", { userId, chatRoomId, text: data.text });
        console.log({ result });
        reset();
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  // Define a function to handle incoming messages
  const handleReceiveMessage = useCallback(
    ({ _id, senderId, text }: IMessage) => {
      console.log({ _id, senderId, text });
      const newObjectMessage = { _id, senderId, text };
      setNewMessage((prevMessages) => [...prevMessages, newObjectMessage]);
    },
    []
  );

  useEffect(() => {
    console.log({ chatRoomId });
    setNewMessage([]);
    if (!userId || !chatRoomId) return;

    // Emit leaveRoom event for the previous room
    socket.emit("leaveRoom", { userId, chatRoomId });

    // Join the new room
    socket.emit("joinRoom", { userId, chatRoomId });

    // Refetch messages for the new chat room
    refetch();

    // Listen for incoming messages
    socket.on("receiveMessage", handleReceiveMessage);

    // Clean up socket event listeners when component unmounts or chatRoomId changes
    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [chatRoomId, userId, refetch, handleReceiveMessage]);

  const handleCloseChatBox = () => {
    if (chatRoomId && userId) {
      // Emit leaveRoom event when closing the chat box
      socket.emit("leaveRoom", { userId, chatRoomId });
    }
    dispatch(isOpenChat({ openChatBox: false }));
  };

  return (
    <>
      {openChatBox && (
        <div className="fixed hidden md:block h-[430px] w-[328px] bg-second-background bottom-0 right-20 z-[100] shadow shadow-primary rounded-tl-lg rounded-tr-lg">
          {/* Header */}
          <div className="flex items-center justify-between px-2 h-14 border-b border-border ">
            <div className="flex items-center gap-2">
              <Avatar
                media={user_avartar ?? undefined}
                isOnline
                height="h-10 cursor-pointer"
              />
              <div className="flex flex-col justify-center">
                <p className="font-medium hover:underline cursor-pointer">
                  {user_name}
                </p>
                <span className="text-sm">Đang hoạt động</span>
              </div>
            </div>
            <div onClick={handleCloseChatBox}>
              <FaXmark className="text-2xl cursor-pointer hover:opacity-75" />
            </div>
          </div>
          {/* Chat box */}
          <div className="w-full h-80  overflow-y-scroll border-b border-border py-1 px-2  scrollbar-thin scrollbar-thumb-primary scrollbar-track-secondary">
            {GetMessages &&
              GetMessages.metadata.map((item) => {
                if (item.senderId === userId) {
                  return <ChatBubbleEnd key={item._id} message={item.text} />;
                }
                return (
                  <ChatBubbleStart chatbox key={item._id} message={item.text} />
                );
              })}
            {newMessage.map((message) => {
              if (message.senderId === userId) {
                return (
                  <ChatBubbleEnd key={message._id} message={message.text} />
                );
              }
              return (
                <ChatBubbleStart
                  chatbox
                  key={message._id}
                  message={message.text}
                />
              );
            })}
          </div>

          {/* Chat input */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-center gap-2 py-2 px-2"
            action=""
          >
            <input
              className={`flex-1 bg-secondary rounded-md p-2 outline-none focus:border-primary focus:border  `}
              type="text"
              autoComplete="off"
              {...register("text", { required: true })}
            />

            <label htmlFor="submit" className="hover:text-primary">
              <IoMdSend className="text-3xl cursor-pointer" />
            </label>
            <input hidden id="submit" type="submit" />
          </form>
        </div>
      )}
    </>
  );
};
