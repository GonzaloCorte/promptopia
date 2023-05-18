"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post ) => (
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
  const [searchText, setSearchText] = useState('');
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setAllPosts(data);
      setFilteredPosts(data);
    }

    fetchPosts();
  }, []);

  const filterPosts = (searchText) => {
    const regex = new RegExp(searchText, 'i');

    return allPosts.filter(
      post => 
        regex.test(post.creator.username) ||
        regex.test(post.prompt) ||
        regex.test(post.tag)
    );
  }

  const handleSearchChange = (e) => {

    setSearchText(e.target.value)

    const auxPosts = filterPosts(e.target.value);

    setFilteredPosts(auxPosts);
    
  }

  const handleTagClick = (tag) => {
    const filtered = filterPosts(tag);

    setFilteredPosts(filtered);
  }

  return (
   <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={filteredPosts}
        handleTagClick={handleTagClick}
      />
   </section>
  )
}

export default Feed