'use server';

import { ApiResponse, getApiUrl, ServerError } from '@/utils/apiUtils';
import { setCookie, handleResponse } from '@/utils/serverApiUtils';

interface LoginResponse {
  token: string;
}

export async function login(
  formData: FormData,
): Promise<ApiResponse<{ success: boolean }>> {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  try {
    const apiUrl = getApiUrl();
    if (!apiUrl) throw ServerError;

    const response = await fetch(`${apiUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const result = await handleResponse<LoginResponse>(response);

    if ('error' in result) {
      return { error: result.error || 'Login failed', code: result.code };
    }

    const { token } = result.data;

    if (!token) {
      throw ServerError;
    }

    // Set JWT in cookies for subsequent requests
    await setCookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Only secure in production
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });

    return { data: { success: true }, code: 200 };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Unknown error occurred.',
      code: 500,
    };
  }
}
