'use server';

import { Pattern } from '@/types/pattern';
import {
  PaginatedResponse,
  buildQueryString,
  getApiUrl,
  ServerError,
  ApiResponse,
} from '@/utils/apiUtils';
import { getAuthHeaders, handleResponse } from '@/utils/serverApiUtils';

export async function getLikedPatterns(
  page: number = 0,
  size: number = 12,
  title?: string | null,
  username?: string | null,
  sortBy?: string | null,
  direction: boolean = true, // true for "asc", false for "desc"
): Promise<ApiResponse<PaginatedResponse<Pattern>>> {
  try {
    const apiUrl = getApiUrl();
    if (!apiUrl) throw ServerError;

    const headers = await getAuthHeaders();

    const queryString = buildQueryString({
      page,
      size,
      title,
      username,
      sortBy,
      direction: direction ? 'asc' : 'desc',
    });

    const url = `${apiUrl}/users/likedPatterns?${queryString}`;

    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    return await handleResponse<PaginatedResponse<Pattern>>(response);
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Unknown error occurred.',
      code: 500,
    };
  }
}

export async function getSharedPatterns(
  page: number = 0,
  size: number = 12,
  title?: string | null,
  username?: string | null,
  sortBy?: string | null,
  direction: boolean = true, // true for "asc", false for "desc"
): Promise<ApiResponse<PaginatedResponse<Pattern>>> {
  try {
    const apiUrl = getApiUrl();
    if (!apiUrl) throw ServerError;

    const headers = await getAuthHeaders();

    const queryString = buildQueryString({
      page,
      size,
      title,
      username,
      sortBy,
      direction: direction ? 'asc' : 'desc',
    });

    const url = `${apiUrl}/users/sharedPatterns?${queryString}`;

    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    return await handleResponse<PaginatedResponse<Pattern>>(response);
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Unknown error occurred.',
      code: 500,
    };
  }
}
