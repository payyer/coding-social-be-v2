import { IoMdSend } from "react-icons/io";
import { NavChatBoxItem } from "../../components/NavChatBox/NavChatBoxItem/NavChatBoxItem";
import { BsImage } from "react-icons/bs";

export const Message = () => {
   return (
      <section className="flex w-full pt-nav-height mx-auto h-screen">
         {/* Left side */}
         <div className="w-[320px] p-4 overflow-y-scroll scrollbar-thin scrollbar-thumb-primary scrollbar-track-secondary">
            <NavChatBoxItem />
         </div>
         {/* Right side */}
         <div className="flex flex-col w-full flex-1 p-4 ">
            {/* Chat box */}
            <div className="flex-1 pb-4">
               <div className=" chat chat-start">
                  <div className="chat-bubble bg-second-background">
                     It's over Anakin,
                     <br />I have the high ground.
                  </div>
               </div>
               <div className="chat chat-end">
                  <div className="chat-bubble bg-second-background">
                     You underestimate my power!
                  </div>
               </div>
            </div>
            {/* Chat box input */}
            <div className="">
               <form className="flex items-center gap-2" action="">
                  <input
                     className="flex-1 bg-secondary rounded-md p-2 outline-none focus:border-primary focus:border "
                     type="text"
                  />
                  <label htmlFor="file">
                     <BsImage className="text-3xl cursor-pointer" />
                  </label>
                  <input hidden type="file" id="file" name="file" />
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
