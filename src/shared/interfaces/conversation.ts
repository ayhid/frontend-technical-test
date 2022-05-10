export default interface Conversation {
  id: number;
  senderId: number;
  senderNickname: string,
  recipientId: number;
  recipientNickname: string;
  lastMessageTimestamp: 0;
}
