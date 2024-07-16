import { LoaderCircle } from "lucide-react";
import useGetMessages from "../../hooks/useGetMessages";
import Message from "./Message";
import "./messageloader.css"
import useListenMessages from "../../hooks/useListenMessages";
import useChatScroll from "../../hooks/useChatScroll";

const Messages = () => {
	const { loading, messages } = useGetMessages()
	useListenMessages()

	const messageScrollRef = useChatScroll(messages) as React.MutableRefObject<HTMLDivElement>
	return (
		<div className='px-4 flex-1 overflow-auto' ref={messageScrollRef}>
			{loading && (
				<div className="loader-container">
					<LoaderCircle className="loader" />
				</div>
			)}
			{!loading && messages.map((message: any) => (
				<Message key={message.id} message={message} />
			))}

			{!loading && messages.length === 0 && messages && (
				<p className="text-center text-white">Send a message to start the conversation</p>
			)}
		</div>
	);
};
export default Messages;
