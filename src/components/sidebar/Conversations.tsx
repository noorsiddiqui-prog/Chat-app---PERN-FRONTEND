import useGetConversation from "../../hooks/useGetConversation";
import { ConversationType } from "../../types/types";
import { getRandomEmoji } from "../../utils/emojis";
import Loader from "../loaders/Loader";
import Conversation from "./Conversation";

const Conversations = () => {
	const { conversations, loading }: { conversations: ConversationType[] | null, loading: boolean } = useGetConversation();

	if (loading) {
		return <Loader />
	}

	if (!conversations) {
		return <div>No conversations available.</div>;
	}

	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{conversations.map((conversation) => (
				<Conversation key={conversation.id} conversation={conversation}
					emoji={getRandomEmoji()}
				/>
			))}
		</div>
	);
};

export default Conversations;
