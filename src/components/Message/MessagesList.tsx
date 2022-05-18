import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import * as React from 'react';
import Loader from '../../shared/Loader';
import { Message } from '../../types/message';

interface IMessagesListProps {
  messages: Message[];
}

const MessagesList: React.FunctionComponent<IMessagesListProps> = ({ messages }) => {
  const { data: session, status } = useSession();

  return (
    <>
      {status === 'loading' ? (
        <Loader />
      ) : (<div className='flex-col space-y-3 ' data-test="messages-list">
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
              'bg-gray-600 rounded-bl-none ': session.id !== item.authorId,
              'bg-blue-500 rounded-br-none ': session.id === item.authorId,
            })}>
              <div className='text-sm font-light'>{item.body}</div>
            </div>
          </div>
        ))}
      </div>)}

    </>
  );
};

export default MessagesList;
