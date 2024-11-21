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

export async function changeUsername(
  formData: FormData,
): Promise<ApiResponse<{ success: boolean }>> {
  try {
    const apiUrl = getApiUrl();
    if (!apiUrl) throw ServerError;

    const headers = await getAuthHeaders();

    // Extract the username from the form data
    const username = formData.get('newUsername');

    console.log(username);
    if (!username || typeof username !== 'string') {
      return {
        error: 'Invalid or missing username',
        code: 400,
      };
    }

    const response = await fetch(`${apiUrl}/users`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ username }),
    });

    if (!response.ok) {
      //const errorData = await response.json();
      return {
        error: 'A user with that username already exists.',
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

export async function changePassword(
  formData: FormData,
): Promise<ApiResponse<{ success: boolean }>> {
  try {
    const apiUrl = getApiUrl();
    if (!apiUrl) throw ServerError;

    const headers = await getAuthHeaders();

    const password = formData.get('newPassword');
    const passwordConfirmed = formData.get('confirmNewPassword');

    if (password != passwordConfirmed) {
      return {
        error: 'Passwords do not match!',
        code: 400,
      };
    }

    console.log(password, passwordConfirmed);
    if (!password || typeof password !== 'string') {
      return {
        error: 'Invalid or missing password',
        code: 400,
      };
    }

    const response = await fetch(`${apiUrl}/users`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        error: errorData.message || 'Failed to change the password',
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

export async function deleteUser(): Promise<ApiResponse<{ success: boolean }>> {
  try {
    const apiUrl = getApiUrl();
    if (!apiUrl) throw ServerError;

    const headers = await getAuthHeaders();

    const response = await fetch(`${apiUrl}/users`, {
      method: 'DELETE',
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        error: errorData.message || 'Failed to delete user',
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
