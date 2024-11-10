'use server';

export const newUrlPattern = async (url: string, width: number, numColors: number) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    return { error: 'API URL is not defined' };
  }
  try {
    const response = await fetch(`${apiUrl}/patterns/url`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url, width, numColors })
    });

    if (!response.ok) {
      throw new Error(`Error: ${response}`);
    }

    const data = await (response.text().then(json => JSON.parse(json))); // Assuming makePattern returns a simple string
    return data
  } catch (error) {
    console.error('Failed to create pattern:', error);
  }
};
