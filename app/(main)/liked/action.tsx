'use server';

import { cookies } from 'next/headers';

export async function getLikedPatterns(
  page: number = 0,
  size: number = 12,
  title?: string | null,
  username?: string | null,
  sortBy?: string | null,
  direction: boolean = true, // true for "asc", false for "desc"
) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    return { error: 'API URL is not defined' };
  }

  let url = `${apiUrl}/users/likedPatterns?page=${page}&size=${size}`;

  if (title) {
    url += `&title=${encodeURIComponent(title)}`;
  }
  if (username) {
    url += `&username=${encodeURIComponent(username)}`;
  }
  if (sortBy) {
    url += `&sortBy=${encodeURIComponent(sortBy)}`;
  }
  url += `&direction=${direction ? 'asc' : 'desc'}`;

  const cookieStore = await cookies();
  const token = cookieStore.get('jwt');

  if (!token) {
    return { error: 'User is not authenticated' };
  }

  const headers: HeadersInit = {
    Authorization: `Bearer ${token.value}`,
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || 'Failed to fetch liked patterns' };
    }

    const data = await response.json();
    return {
      patterns: data.content,
      totalPages: data.totalPages,
      currentPage: data.pageable.pageNumber,
    };
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return { error: 'Server is not responding.' };
    }
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
