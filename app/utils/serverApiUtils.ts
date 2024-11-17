'use server';

import { cookies } from 'next/headers';
import { ApiResponse } from './apiUtils';

export const getAuthHeaders = async (
  includeContentType: boolean = true,
): Promise<Record<string, string>> => {
  const cookieStore = await cookies();
  const token = cookieStore.get('jwt')?.value;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
  };

  if (includeContentType) {
    headers['Content-Type'] = 'application/json';
  }

  return headers;
};

export const setCookie = async (
  name: string,
  value: string,
  options: {
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: 'strict' | 'lax' | 'none';
    maxAge?: number;
    path?: string;
  } = {},
): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.set(name, value, {
    httpOnly: options.httpOnly ?? true,
    secure: options.secure ?? process.env.NODE_ENV === 'production',
    sameSite: options.sameSite ?? 'strict',
    maxAge: options.maxAge ?? 60 * 60 * 24 * 30, // Default to 30 days
    path: options.path ?? '/',
  });
};

export const deleteCookie = async (name: string): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.delete(name);
};

export const handleResponse = async <T>(
  response: Response,
): Promise<ApiResponse<T>> => {
  const responseBody = await response.json().catch(() => ({})); // Gracefully handle empty responses
  if (!response.ok) {
    return {
      error:
        responseBody.message || response.statusText || 'Unknown error occurred',
      code: response.status,
    };
  }
  return { data: responseBody as T, code: response.status };
};
