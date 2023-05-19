"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from "next/navigation";

import Profile from '@components/Profile';


const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const username = searchParams.get('name');

  // const searchParams = useSearchParams();
  // const username = searchParams.get("name");

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${params?.id}/posts`)
      const data = await res.json();

      setPosts(data);

    }
    if (params?.id) fetchPosts();

  }, [params.id]);

  return (
    <Profile
      name = {username}
      desc = {'You may find interesting things around here'}
      data = {posts}
    />
  )
}

export default UserProfile;