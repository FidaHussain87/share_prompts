'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Profile from '@components/Profile'

const MyProfile = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const name = searchParams.get('name')
  const { data: session } = useSession()
  const [posts, setPosts] = useState([])
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`)
      const data = await response.json()
      setPosts(data)
    }
    if (session?.user.id) fetchPost()
  }, [])

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/prompt/${id}/${name}`)
      const data = await response.json()
      setPosts(data)
    }
    if (id) fetchPost()
  }, [id])
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  }
  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      'Are you sure do you want to delete this prompt? ',
    )
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE',
        })
        const filteredPost = posts.filter((p) => p._id !== post._id)
        setPosts(filteredPost)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <Profile
      name={
        (session?.user.id || session?.user.id === id) && name == null
          ? 'My'
          : name
      }
      desc={
        session?.user.id || session?.user.id === id
          ? 'Welcome to your personalize profile'
          : `Welcome to ${name}'s personalized profile page. Explore ${name}'s exceptional prompts and be inspired by the power of their imagination`
      }
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile
