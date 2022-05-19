import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import * as React from 'react';
import useRequest from '../shared/hooks/useRequest'
import Loader from '../shared/Loader';
import { Message } from '../types/message';
import MessageInput from './MessageInput';

interface IMessagesListProps {
  conversationId: number;
}

const MessagesList: React.FunctionComponent<IMessagesListProps> = ({ conversationId }) => {
  const { data: session, status } = useSession();
  const messagesApiUrl = conversationId ? `${process.env.NEXT_PUBLIC_API_URL}/messages/${conversationId}` : null;

  const { data: messages, error } = useRequest<Message[]>({ url: messagesApiUrl });

  return (
    <>
      {status === 'loading' ? (
        <Loader />
      ) : (
          <div className="conversation-wrapper flex flex-col justify-between border  h-full">
            <div className='flex flex-col space-y-3 p-3 pb-2 overflow-y-auto' data-test="messages-list">
            {messages?.sort((item1, item2) => {
              if (item1.timestamp < item2.timestamp) {
                return -1;
              } else if (item1.timestamp > item2.timestamp) {
                return 1;
              } else {
                return 0;
              }
            })?.map(item => (
              <div key={item.id} className={classNames("flex", {
                'justify-start': session.id !== item.authorId,
                'justify-end ': session.id === item.authorId,
              })}>
                <div className={classNames('rounded-lg md:max-w-sm w-2/3 md:w-max  py-1 px-2 text-white', {
                  'bg-gray-300 text-gray-700 rounded-bl-none ': session.id !== item.authorId,
                  'bg-blue-300 text-blue-900 rounded-br-none ': session.id === item.authorId,
                })}>
                  <div className='text-sm font-light'>{item.body}</div>
                </div>
              </div>
            ))}
          </div>
            <div className='w-full px-2 py-5 border-t border-gray-300 '>
            <MessageInput conversationId={conversationId} />
          </div>
        </div>
      )}

    </>
  );
};

export default MessagesList;
