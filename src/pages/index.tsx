import React from 'react'
import { useSession } from 'next-auth/react';

import ConversationsList from '../components/Conversation/ConversationsList'

const Home: React.FC = () => {

  const {data:session, status} = useSession();
  
  if(status === 'loading'){
    return <Spinner />;
  }else if(status ==='unauthenticated'){
    return <div>please signin to see your messages</div>
  }else {
    return  <ConversationsList  />
  }
}

export default Home
