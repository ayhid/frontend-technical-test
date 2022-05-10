import type { FC } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Logo from '../assets/lbc-logo.webp'
import styles from '../styles/Home.module.css'
import ConversationsList from '../components/Conversation/ConversationsList'

const Home: FC = () => {
  const year = new Date().getFullYear()

  return (
    <div className={styles.container}>
      <ConversationsList />
    </div>
  )
}

export default Home
