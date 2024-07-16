export interface ISignUpInputs {
    fullName: string
    username: string
    // email: string
    password: string
    confirmPassword: string
    gender: string
}

export interface ConversationType {
    id: string;
    fullName: string;
    profilePic: string;
}

export interface MessageType {
    id: string;
    body: string;
    senderId: string;
    shouldShake?: boolean;
    createdAt: string;

}

export interface IConversationState {
    selectedConversation: ConversationType | null;
    messages: MessageType[];
    setSelectedConversation: (conversation: ConversationType | null) => void;
    setMessages: (messages: MessageType[]) => void;
    // resetConversation: () => void;
    // resetMessages: () => void;
}
