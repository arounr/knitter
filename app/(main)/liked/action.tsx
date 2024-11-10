'use server';

import { cookies } from 'next/headers';

export async function getLikedPatterns() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    return { error: 'API URL is not defined' };
  }

  // Retrieve the JWT token from cookies
  const cookieStore = await cookies();
  const token = cookieStore.get('jwt');

  if (!token) {
    return { error: 'User is not authenticated' };
  }

  try {
    const response = await fetch(`${apiUrl}/users/likedPatterns`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'application/json',
      },
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
    // Check for network or fetch-specific error
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return { error: 'Server is not responding.' };
    }

    // Generic error fallback
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
