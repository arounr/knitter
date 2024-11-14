export async function getMostLikedPatterns(amount: number) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    return { error: 'API URL is not defined' };
  }

  try {
    const response = await fetch(
      `${apiUrl}/patterns/public?size=${amount}&sortBy=likeCount&direction=desc`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || 'Failed to fetch patterns' };
    }

    const userPatterns = await response.json();
    return userPatterns.content;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return { error: 'Server is not responding.' };
    }

    // Generic error fallback
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

import { redirect } from 'next/navigation';

export async function handlePatternClick(patternId: string) {
  redirect(`/patterns/${patternId}`);
}
