import { useSession } from 'next-auth/react';
import * as React from 'react';
import useRequest from '../shared/hooks/useRequest';
import { getConversationTitle } from '../shared/utils';
import { Conversation } from '../types/conversation';
import ConversationsListSkeleton from './ConversationSkeleton';
interface ConversationsListProps {
  onConversationSelect: (conversationId: number) => void
}
const ConversationsList: React.FunctionComponent<ConversationsListProps> = ({ onConversationSelect }) => {
  const { data: session, status } = useSession();
  const url = status !== 'loading' && session ? `${process.env.NEXT_PUBLIC_API_URL}/conversations/${session.id}` : null;
  const { data: userConversations } = useRequest<Conversation[]>({ url });
  return (
    <div data-test="conversations-wrapper h-full">
      {status === 'loading' ? (<ConversationsListSkeleton />) : (
        <div className="block">
          <ul role="list" className="divide-y divide-gray-300" data-test="conversations-list">
            {userConversations?.map((oneConversation) => {
              const conversationTitle = getConversationTitle(oneConversation, session.id as number);
              return (
                <li key={oneConversation.id} className="py-2 cursor-pointer hover:bg-orange-300 px-1" >

                  <button className='pl-6' aria-label={`Conversation with ${conversationTitle}`} data-test="conversation-item" onClick={() => { onConversationSelect(oneConversation.id) }} >

                    <div className="flex items-center space-x-4">
                      <div className="rounded-full w-8 h-8  inline-flex items-center justify-center bg-orange-600">
                        <span className="font-lato font-semibold leading-none text-selago uppercase text-white">{conversationTitle.substring(0, 1)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{conversationTitle}</p>
                        <p className="text-sm text-gray-500 lowercase">{`@${conversationTitle}`}</p>
                      </div>
                      <div>
                      </div>
                    </div>

                  </button>
               </li>

              )
            })}
          </ul>
        </div>
      )}

    </div >
  );
};

export default ConversationsList;
