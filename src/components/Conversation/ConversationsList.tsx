import * as React from 'react';
import { useCurrentUser } from '../../shared/context/UserContext';
import useRequest from '../../shared/hooks/useRequest';
import { Conversation } from '../../types/conversation';
import { User } from '../../types/user';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import ConversationsListSkeleton from './ConversationSkeleton';





const getConversationTitle = (conversation: Conversation, currentUser: User) => {
  if (currentUser.nickname !== conversation.senderNickname) {
    return conversation.senderNickname;
  }
  return conversation.recipientNickname;

}
const ConversationsList: React.FunctionComponent = () => {

  const { data: session, status } = useSession();

  console.log('status ConversationsList', status);
  console.log('status ConversationsList', session);
  const url = status!== 'loading' && session ? `${process.env.NEXT_PUBLIC_API_URL}/conversations/${session.id}` : null;

  const { data: userConversations } = useRequest<Conversation[]>({ url });
  console.log('userConversations', userConversations);

  return (

    <div>
      <h1 className='font-bold text-2xl capitalize text-orange-500'>Mes conversations</h1>
      {status === 'loading' ? (<ConversationsListSkeleton />) : (
        <div className="flow-root mt-6">
          <ul role="list" className="-my-5 divide-y divide-gray-200">
            {userConversations?.map((oneConversation) => {
              const conversationTitle = getConversationTitle(oneConversation, session.user);
              return (
                <li key={oneConversation.id} className="py-4 hover:bg-orange-300 px-3" >

                  <Link href={`/conversation/${oneConversation.id}`} passHref>
                    <a>
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
                    </a>
                  </Link>
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
