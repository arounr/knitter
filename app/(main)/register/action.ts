'use server';

import { ApiResponse, getApiUrl, ServerError } from '@/utils/apiUtils';
import { handleResponse } from '@/utils/serverApiUtils';

export async function register(
  formData: FormData,
): Promise<ApiResponse<{ success: boolean }>> {
  try {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    if (!username || !password) {
      return { error: 'Username and password are required.', code: 400 };
    }

    const apiUrl = getApiUrl();
    if (!apiUrl) throw ServerError;

    const response = await fetch(`${apiUrl}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const result = await handleResponse<{ success: boolean }>(response);

    console.log(result);
    if ('error' in result) {
      if (result.code === 400 && result.error) {
        return {
          error:
            typeof result.error === 'string'
              ? result.error
              : Object.values(result.error).join(', '),
          code: 400,
        };
      }

      return result;
    }

    return { data: { success: true }, code: result.code };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Unknown error occurred.',
      code: 500,
    };
  }
}
