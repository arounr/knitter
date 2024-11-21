'use server';
import { getApiUrl, ServerError } from '@/utils/apiUtils';
import { getAuthHeaders } from '@/utils/serverApiUtils';

export const newUrlPattern = async (
  url: string,
  width: number,
  numColors: number,
) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    return { error: 'API URL is not defined' };
  }
  try {
    const response = await fetch(`${apiUrl}/patterns/url`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, width, numColors }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response}`);
    }

    const data = await response.text(); // Assuming makePattern returns a simple string
    return data;
  } catch (error) {
    console.error('Failed to create pattern:', error);
  }
};

export const savePattern = async (formData: FormData) => {
  const title = String(formData.get('name'));
  const isPublic = formData.get('public') == 'on';
  const pm = String(formData.get('pattern')).split(',');
  const color = String(formData.get('color'))
    .split(',')
    .filter((v) => v);
  try {
    const apiUrl = getApiUrl();
    if (!apiUrl) throw ServerError;

    const headers = await getAuthHeaders(false);

    const response = await fetch(`${apiUrl}/patterns`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify({
        title,
        isPublic,
        patternMatrix: pm,
        colorCodes: color,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        error: errorData.message || 'Failed to save pattern',
        code: response.status,
      };
    }

    return { data: { success: true }, code: response.status };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Unknown error occurred.',
      code: 500,
    };
  }
};
