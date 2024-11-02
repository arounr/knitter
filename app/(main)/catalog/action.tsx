'use server';

export async function fetchPatterns(page = 0, size = 12) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    return { error: 'API URL is not defined' };
  }

  try {
    const response = await fetch(`${apiUrl}/patterns?page=${page}&size=${size}`, {
      method: 'GET',
      headers: {
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
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return { error: 'Server is not responding.' };
    }
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
