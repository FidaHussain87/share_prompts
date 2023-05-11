'use client'
import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'
import { filterHelper } from '@utils/filter'
const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}
const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [searchTimeout, setSearchTimeout] = useState(null)

  const handleSearchChange = (e) => {
    e.preventDefault()
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterHelper(posts, searchText)
        setFilteredData(searchResult)
      }, 800),
    )
  }

  const handleTagClick = (tagName) => {
    setSearchText(tagName)
    const searchResult = filterHelper(posts, tagName)
    setFilteredData(searchResult)
  }
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json()
      setPosts(data)
    }
    fetchPost()
  }, [])

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or user name"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList
        data={searchText ? filteredData : posts}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed
