"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import Profile from '@components/Profile';


const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const username = searchParams('name');
  return (
    <div>User Profile</div>
  )
}

export default UserProfile;