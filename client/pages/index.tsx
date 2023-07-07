
import Form from '@/components/Form';
import Header from '@/components/Header'
import PostFeed from '@/components/posts/PostFeed';
import { useActions } from '@/hooks/useActions'
import { useCurrentsUser } from '@/hooks/useCurrentsUser';
import { usePosts } from '@/hooks/usePosts';
import { fetchPosts } from '@/serveces/posts';
import { fetchCurrentUser } from '@/serveces/user';
import { fetchUsers } from '@/serveces/users';
import { Inter } from 'next/font/google'
import { useEffect } from "react";
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { posts } = usePosts()

  return (
    <>
      <Header label='Home'></Header>
      <Form placeholder="What's happening?" />
      <PostFeed posts={posts}/>
    </>
  )
}
