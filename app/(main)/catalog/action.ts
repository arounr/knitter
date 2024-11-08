'use server';

import { cookies } from 'next/headers';

export async function fetchPatterns(
  isPrivate: boolean, // parameter to specify private (library) or public fetch (catalog)
  page: number = 0,
  size: number = 12,
  title?: string | null,
  username?: string | null,
  sortBy?: string | null,
  direction: boolean = true // true for "asc", false for "desc"
) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    return { error: 'API URL is not defined' };
  }

  // Set the base URL based on whether the fetch is for private or public patterns
  let url = `${apiUrl}/patterns/${isPrivate ? 'private' : 'public'}?page=${page}&size=${size}`;

  // Append optional parameters if they are provided
  if (title) {
    url += `&title=${encodeURIComponent(title)}`;
  }
  if (username) {
    url += `&username=${encodeURIComponent(username)}`;
  }
  if (sortBy) {
    url += `&sortBy=${encodeURIComponent(sortBy)}`;
  }

  // Convert the boolean `direction` to "asc" or "desc"
  url += `&direction=${direction ? 'asc' : 'desc'}`;

  // Set up headers
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // If fetching private patterns, add authorization headers
  if (isPrivate) {
    const cookieStore = await cookies();
    const token = cookieStore.get('jwt');
    if (!token) {
      return { error: 'User is not authenticated' };
    }
    headers['Authorization'] = `Bearer ${token.value}`;
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || 'Failed to fetch patterns' };
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
