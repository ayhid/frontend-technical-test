import * as React from 'react';
import ChatIcon from '@heroicons/react/outline/ChatIcon';
import PlusIcon from '@heroicons/react/solid/PlusIcon';
const NoSelectedConversation: React.FunctionComponent = (props) => {
  return <div className='text-center'>

    <ChatIcon className='w-12 h-12 mx-auto text-gray-400' />
    <h3 className="mt-2 text-sm font-medium text-gray-900">Feeling Chatty?</h3>
    <p className="mt-1 text-sm text-gray-500 w-1/2 mx-auto">Select a contact on the left to resume a conversation, or begin a new one</p>
    <div className="mt-6">
      <button
        type="button"
        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
      >
        <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        New Conversation
      </button>
    </div>

  </div>;
};

export default NoSelectedConversation;
