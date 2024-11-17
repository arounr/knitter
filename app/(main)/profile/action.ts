'use server';

import { User } from '@/types/user';
import { ApiResponse, getApiUrl, ServerError } from '@/utils/apiUtils';
import { getAuthHeaders, handleResponse } from '@/utils/serverApiUtils';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function getProfile(): Promise<ApiResponse<User>> {
  try {
    const apiUrl = getApiUrl();
    if (!apiUrl) throw ServerError;

    const headers = await getAuthHeaders();
    const response = await fetch(`${apiUrl}/profile`, {
      method: 'GET',
      headers,
    });

    return await handleResponse<User>(response);
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Unknown error occurred.',
      code: 500,
    };
  }
}

export async function uploadProfilePicture(
  file: File,
): Promise<ApiResponse<{ success: boolean }>> {
  try {
    const apiUrl = getApiUrl();
    if (!apiUrl) throw ServerError;

    const headers = await getAuthHeaders(false);

    // Create FormData and append the file
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${apiUrl}/profile/uploadPicture`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        error: errorData.message || 'Failed to upload profile picture',
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
}

export async function logout() {
  // Clear the JWT cookie
  const cookieStore = await cookies();
  cookieStore.delete('jwt');

  redirect('/login');
}
