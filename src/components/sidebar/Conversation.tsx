import { useSocketContext } from "../../context/SocketContext";
import { ConversationType } from "../../types/types";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, emoji }: { conversation: ConversationType | any, emoji: string }) => {
	const { setSelectedConversation, selectedConversation } = useConversation()
	const isSelected = selectedConversation?.id === conversation.id;
	const { onlineUsers } = useSocketContext()
	const isOnline = onlineUsers.includes(conversation.id)

	return (
		<>
			<div
				onClick={() => setSelectedConversation(conversation)}
				className={`flex gap-4 items-center hover:bg-sky-600 rounded-lg p-3 cursor-pointer transition duration-200 ease-in-out ${isSelected ? "bg-sky-500" : ""}`}>
				<div className='relative'>
					<div className='w-10 md:w-14 rounded-full overflow-hidden'>
						<img src={conversation.profilePic} alt='user avatar' />
					</div>
					<span className={`absolute bottom-0 right-0 block w-3 h-3 md:w-4 md:h-4 ${isOnline ? "bg-green-500" : "bg-gray-400"} border-2 border-white rounded-full`} />
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex justify-between'>
						<p className='font-bold text-gray-200 text-sm md:text-md'>{conversation.fullName}</p>
						<span className='text-lg md:text-xl'>{emoji}</span>
					</div>
					<p className='text-gray-400 text-xs md:text-sm'>{conversation.lastMessage}</p>
				</div>
			</div>

			<div className='border-b border-gray-600' />
		</>
	);
};

export default Conversation;
