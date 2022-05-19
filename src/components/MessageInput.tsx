import PaperAirPlaneeIcon from '@heroicons/react/outline/PaperAirplaneIcon';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useRef } from 'react';
import { useSWRConfig } from 'swr';
const { DateTime } = require("luxon");
interface IMessageInputProps {
  conversationId?: number
}

const MessageInput: React.FunctionComponent<IMessageInputProps> = ({ conversationId }) => {
  const { mutate } = useSWRConfig();
  const { data: session } = useSession();

  const input = useRef(null);
  return <div className='flex items-center justify-around w-full'>
    <input type="text" placeholder="Message"
      className="block w-full py-2 pl-4 bg-gray-100 rounded-full outline-none focus:text-gray-700" ref={input}
      name="message" required />
    <button type="submit" aria-label='Send Message' onClick={() => {
      const message = input.current.value;
      const newMessageInConversationUrl = conversationId ? `${process.env.NEXT_PUBLIC_API_URL}/messages/${conversationId}` : null;
      if (newMessageInConversationUrl) {
        axios.post(newMessageInConversationUrl, {
          body: message,
          timestamp: DateTime.now().valueOf(),
          conversationId,
          authorId: session.id
        }).then((response) => {
          input.current.value = '';
          mutate(newMessageInConversationUrl);
        }).catch((error) => {

        })
      }


    }}>
      <PaperAirPlaneeIcon className='w-6 h-6 rotate-90 text-gray-500' />
    </button>
  </div>;
};

export default MessageInput;
