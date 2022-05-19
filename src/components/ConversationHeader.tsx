import ArrowLeftIcon from "@heroicons/react/outline/ArrowLeftIcon";
import { DateTime } from 'luxon';
import { useSession } from 'next-auth/react';
import * as React from 'react';
import useRequest from '../shared/hooks/useRequest';
import { getConversationTitle } from '../shared/utils';
import { Conversation } from '../types/conversation';

interface ConversationHeaderProps {
  conversationId: number;
  onBackToConversationsList: ()=>void
}


const ConversationHeader: React.FunctionComponent<ConversationHeaderProps> = ({ conversationId, onBackToConversationsList}) => {
  
  const { data: session, status } = useSession();
  const url = conversationId ? `${process.env.NEXT_PUBLIC_API_URL}/conversation/details/${conversationId}` : null;
  const { data: conversation, error } = useRequest<Conversation>({ url });
  

  return (
    <div className='py-3 px-4 flex justify-between bg-gray-200 border-b border-gray-300 items-center text-gray-600'>
      <button aria-label='Back to conversations list' className='md:hidden'>
        <ArrowLeftIcon className='w-6 h-6' onClick={onBackToConversationsList} />
      </button>
      
      <h1 className='font-bold text-2xl capitalize' data-test="conversation-title">
        {getConversationTitle(conversation, session.id as number)}
      </h1>
      <span className='text-sm'>{`last message, ${new DateTime.fromSeconds(parseInt(conversation?.lastMessageTimestamp)).toRelative()}`}</span>
    </div>

  );
};

export default ConversationHeader;
