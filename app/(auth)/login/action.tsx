'use server';

import { cookies } from 'next/headers';

export async function login(formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    return { error: 'API URL is not defined' };
  }

  try {
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || 'Login failed' };
    }

    const data = await response.json();
    const token = data.token;
    if (!token) {
      return { error: 'Token not found in response' };
    }

    const cookieStore = await cookies();

    cookieStore.delete('jwt'); // Remove existing JWT if present

    cookieStore.set('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });

    return { success: true };
  } catch (error) {
    // Check for network or fetch-specific error
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return { error: 'Server is not responding.' };
    }
    
    // Generic error fallback
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
