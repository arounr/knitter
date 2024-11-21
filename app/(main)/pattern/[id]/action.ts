'use server';

import { ApiResponse, getApiUrl, ServerError } from '@/utils/apiUtils';
import { getAuthHeaders, handleResponse } from '@/utils/serverApiUtils';

export async function getPatternById(id: string) {
  try {
    const apiUrl = getApiUrl();
    if (!apiUrl) throw ServerError;

    const headers = await getAuthHeaders();

    const response = await fetch(`${apiUrl}/patterns/${id}`, { headers });
    return await handleResponse(response);
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Unknown error occurred.',
      code: 500,
    };
  }
}

export async function likeUnlikePattern(patternId: string) {
  try {
    const apiUrl = getApiUrl();
    if (!apiUrl) throw ServerError;

    const headers = await getAuthHeaders();

    const response = await fetch(`${apiUrl}/patterns/like/${patternId}`, {
      method: 'POST',
      headers,
    });
    return await handleResponse(response);
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Unknown error occurred.',
      code: 500,
    };
  }
}

export async function saveToLibrary(patternId: string) {
  try {
    const apiUrl = getApiUrl();
    if (!apiUrl) throw ServerError;

    const headers = await getAuthHeaders();

    const response = await fetch(`${apiUrl}/patterns/save/${patternId}`, {
      method: 'POST',
      headers,
    });

    return await handleResponse(response);
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Unknown error occurred.',
      code: 500,
    };
  }
}

export async function sharePattern(id: string, username: string) {
  try {
    const apiUrl = getApiUrl();
    if (!apiUrl) throw ServerError;

    const headers = await getAuthHeaders();

    const response = await fetch(`${apiUrl}/patterns/share/${id}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ username }),
    });
    const result = await handleResponse(response);

    return result;
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Unknown error occurred.',
      code: 500,
    };
  }
}

export async function deletePattern(
  id: string,
): Promise<ApiResponse<{ success: boolean }>> {
  try {
    const apiUrl = getApiUrl();
    if (!apiUrl) throw ServerError;

    const headers = await getAuthHeaders();

    const response = await fetch(`${apiUrl}/patterns/${id}`, {
      method: 'DELETE',
      headers,
    });
    const result = await handleResponse(response);

    if ('error' in result) {
      return {
        error: result.error || 'Deleting pattern failed',
        code: result.code,
      };
    }

    console.log(result);

    return { data: { success: true }, code: result.code };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Unknown error occurred.',
      code: 500,
    };
  }
}
