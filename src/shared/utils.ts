import { Conversation } from "../types/conversation";
import { User } from "../types/user";

export  const getConversationTitle = (conversation: Conversation, userId: number) => {
  if (userId !== conversation?.senderId) {
    return conversation?.senderNickname;
  }
  return conversation?.recipientNickname;
}
