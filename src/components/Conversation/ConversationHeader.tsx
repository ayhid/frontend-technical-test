import { useRouter } from 'next/dist/client/router';
import * as React from 'react';
import useRequest from '../../shared/hooks/useRequest';
import { getConversationTitle } from '../../shared/utils';
import { Conversation } from '../../types/conversation';
import { DateTime } from 'luxon';
import { useSession } from 'next-auth/react';





const ConversationHeader: React.FunctionComponent = () => {
  const { query: { conversationId } } = useRouter();
  const { data: session, status } = useSession();
  const url = conversationId ? `${process.env.NEXT_PUBLIC_API_URL}/conversation/details/${conversationId}` : null;
  const { data: conversation, error } = useRequest<Conversation>({ url });
  

  return (
    <div className='flex justify-between border-b border-gray-800 mb-10 items-center'>
      <h1 className='font-bold text-2xl capitalize text-gray-700' data-test="conversation-title">
        {getConversationTitle(conversation, session.id as number)}
      </h1>
      <span className='text-sm'>{`last message, ${new DateTime.fromSeconds(parseInt(conversation?.lastMessageTimestamp)).toRelative()}`}</span>
    </div>

  );
};

export default ConversationHeader;
