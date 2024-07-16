import { useAuthContext } from "../../context/AuthContext";
import { MessageType } from "../../types/types";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";
import "./message.css"

const Message = ({ message }: { message: MessageType }) => {
	// const fromMe = message.fromMe;
	const { authUser } = useAuthContext()
	const { selectedConversation } = useConversation()
	const fromMe = message?.senderId === authUser?.id;
	const chatClass = fromMe ? "chat-end" : "chat-start";

	const img = fromMe
		? authUser?.profilePic ?? "https://avatar.iran.liara.run/public/boy?username=johndoe"
		: selectedConversation?.profilePic ?? "https://avatar.iran.liara.run/public/boy?username=janedoe";

	const bubbleBg = fromMe ? "bg-blue-500" : "";
	const shakeClass = message.shouldShake ? "shake" : ""
	return (
		<div className={`chat ${chatClass}`}>
			<div className='hidden md:block chat-image avatar'>
				<div className='w-6 md:w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={img} />
				</div>
			</div>
			<p className={`chat-bubble text-white ${bubbleBg} ${shakeClass} text-sm md:text-md`}>{message.body}</p>
			<div><span className='chat-footer opacity-50 text-xs flex gap-1 items-center text-white'>{extractTime(message.createdAt)}</span></div>
		</div>
	);
};
export default Message;
