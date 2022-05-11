import axios from 'axios';
import get from 'lodash/get';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { User } from '../../../types/user';
import jwt from 'jsonwebtoken';

const options = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: 'Nickname',
      credentials: {
        nickname: { label: 'Nickname', type: 'text', placeholder: 'jeremie' },
      },
      async authorize(credentials) {
        try {
          const { data: allUsers } = await axios.get<User[]>(`${process.env.NEXT_PUBLIC_API_URL}/users`);
          console.log('all users', allUsers);
          const user = allUsers.find((item)=>{
           
            return item?.nickname.toLowerCase() === credentials?.nickname.toLowerCase();
          });
          if (user) {
            return user;
          } else {
            return false;
          }
        } catch (error) {
          console.log('ERROR', error);
          return false;
        }
      },
    }),
    
  ],
  
  callbacks: {
     async jwt({ token, user, account }) {
      
      if(account && user){
        token.accessToken = jwt.sign({user}, process.env.NEXTAUTH_SECRET);
        token.userId = user.id;
        token.user = user;
      }
      return token;
    },
     async session ( { session, token, user}) {
      
      session.jwt = token.accessToken;
      session.id = token.userId;
      session.user = token.user;
      return session;
      
    },

  },
  theme: {
    colorScheme: "light",
    brandColor: "#f97316"
  
  },
  debug: process.env.NODE_ENV === 'development',
};
export default NextAuth(options);
