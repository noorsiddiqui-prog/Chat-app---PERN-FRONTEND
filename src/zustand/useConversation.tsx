import { create } from "zustand"
import { IConversationState } from "../types/types"

const useConversation = create<IConversationState>((set) => ({
    selectedConversation: null,
    setSelectedConversation: (conversation) => set({ selectedConversation: conversation }),
    messages: [],
    setMessages: (messages) => set({ messages }),
    // resetConversation: () => set({ selectedConversation: null }),
    // resetMessages: () => set({ messages: [] }),
}))
export default useConversation