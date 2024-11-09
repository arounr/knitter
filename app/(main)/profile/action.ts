'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function getProfile() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    return { error: 'API URL is not defined' };
  }

  // Retrieve the JWT token from cookies
  const cookieStore = await cookies();
  const token = cookieStore.get('jwt');

  if (!token) {
    return { error: 'User is not authenticated' };
  }

  try {
    const response = await fetch(`${apiUrl}/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || 'Failed to fetch profile' };
    }

    const profileData = await response.json();
    return profileData;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return { error: 'Server is not responding.' };
    }

    // Generic error fallback
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function uploadProfilePicture(file: File) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    return { error: 'API URL is not defined' };
  }

  // Retrieve the JWT token from cookies
  const cookieStore = await cookies();
  const token = cookieStore.get('jwt');

  if (!token) {
    return { error: 'User is not authenticated' };
  }

  try {
    // Create FormData and append the file using the field name "file"
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${apiUrl}/profile/uploadPicture`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token.value}`,
      },
      body: formData,
    });

    if (!response.ok) {
      console.log(response)
      const errorData = await response.json();
      return { error: errorData.message || 'Failed to upload profile picture' };
    }

    return { success: true };
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return { error: 'Server is not responding.' };
    }

    // Generic error fallback
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


export async function logout() {
  // Clear the JWT cookie
  const cookieStore = await cookies();
  cookieStore.delete('jwt');

  redirect('/');
}