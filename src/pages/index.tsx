import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import ConversationHeader from '../components/ConversationHeader';
import ConversationsList from '../components/ConversationsList';
import NoSelectedConversation from '../components/NoSelectedConversation';
import MessagesList from '../components/MessagesList';
import Loader from '../shared/Loader';

const Home: React.FC = () => {

  const { status } = useSession();
  const [selectedConversationId, setSelectedConversationId] = useState(null)

  if (status === 'loading') {
    return <Loader />;
  } else if (status === 'unauthenticated') {
    return <div className='text-center px-3 py-2'>please signin to see your messages</div>
  } else {

    return (
      <div className="flex h-full">
        <div className={classNames('md:w-1/3 w-full border-r border-gray-300', {
          'hidden md:block ': selectedConversationId !== null
        })}>
          <ConversationsList onConversationSelect={setSelectedConversationId} />
        </div>
        <div className="flex-1 relative">
          {selectedConversationId ? (
            <div>
              <ConversationHeader conversationId={selectedConversationId} onBackToConversationsList={() => {
                setSelectedConversationId(null);
              }} />
              <MessagesList conversationId={selectedConversationId} />
            </div>
          ) : (
            <div className="hidden md:flex justify-center items-center absolute inset-0 " data-test="conversations-list-default-message">
              <NoSelectedConversation />
            </div>)
          }
        </div>
      </div>
    )



  }
}

export default Home
