import { Search } from "lucide-react";
import { useState } from "react";
import useConversation from "../../zustand/useConversation";
import useGetConversation from "../../hooks/useGetConversation";
import toast from "react-hot-toast";
import { ConversationType } from "../../types/types";

const SearchInput = () => {
	const [search, setSearch] = useState<string>("")
	const { setSelectedConversation } = useConversation()
	const { conversations } = useGetConversation()

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!search) return;

		if (search.length < 3) {
			return toast.error("Search must be at least 3 characters long")
		}

		const conversation = conversations?.find((c: ConversationType) => {
			return c.fullName.toLowerCase().includes(search.toLowerCase())
		});

		if (conversation) {
			setSelectedConversation(conversation)
			setSearch("")
		} else {
			toast.error("No such user found!")
		}
	}
	return (
		<form className='flex items-center gap-2 w-full max-w-md' onSubmit={handleSubmit}>
			<input
				type='text'
				placeholder='Search…'
				className='p-2 text-black placeholder-gray-500 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 w-full'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<button type='submit' className='p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'>
				<Search className='w-5 h-5 md:w-6 md:h-6' />
			</button>
		</form>
	);
};

export default SearchInput;
