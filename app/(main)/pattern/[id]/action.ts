'use server';

import { cookies } from 'next/headers';

export async function getPatternById(id: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    return { error: 'API URL is not defined' };
  }

  // Retrieve the JWT token from cookies
  const cookieStore = await cookies();
  const token = cookieStore.get('jwt')?.value;

  try {
    // Prepare headers based on token availability
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Fetch the pattern data from the backend
    const response = await fetch(`${apiUrl}/patterns/${id}`, {
      method: 'GET',
      headers,
    });

    // Check if the pattern was found
    if (response.status === 404) {
      return { error: `Pattern with ID ${id} not found.` };
    }

    // Check for unauthorized access
    if (response.status === 401 || response.status === 403) {
      return { error: 'You are not authorized to view this pattern.' };
    }

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || 'Failed to fetch pattern data.' };
    }

    // Parse and return the pattern data
    const patternData = await response.json();
    return patternData;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return { error: 'Server is not responding.' };
    }
    // Generic error fallback
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function likeUnlikePattern(patternId: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error('API URL is not defined');
  }

  // Retrieve the JWT token from cookies
  const cookieStore = await cookies();
  const token = cookieStore.get('jwt');

  if (!token) {
    throw new Error('User is not authenticated');
  }

  try {
    const response = await fetch(`${apiUrl}/patterns/like/${patternId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to toggle like status');
    }

    return { success: true };
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Server is not responding.');
    }

    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

