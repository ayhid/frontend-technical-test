import { useRouter } from 'next/dist/client/router';
import type { FC } from 'react';
import ConversationHeader from '../../components/Conversation/ConversationHeader';
import MessagesList from '../../components/Message/MessagesList';
import useRequest from '../../shared/hooks/useRequest';
import { Conversation } from '../../types/conversation';
import { Message } from '../../types/message';


const ConversationPage: FC = () => {
  const { query: { conversationId } } = useRouter();
  const messagesApiUrl = conversationId ? `${process.env.NEXT_PUBLIC_API_URL}/messages/${conversationId}` : null;

  const { data: messages, error: messageserror } = useRequest<Message[]>({ url: messagesApiUrl });



  return (
    <div className="">
      <ConversationHeader />
      <MessagesList messages={messages} />
    </div>
  )
}

export default ConversationPage
