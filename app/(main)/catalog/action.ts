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

export async function fetchPatterns(
  isPrivate: boolean, // Specify whether to fetch private (library) or public (catalog) patterns
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

    // Base path depends on `isPrivate`
    const basePath = isPrivate ? 'private' : 'public';

    // Build query string
    const queryString = buildQueryString({
      page,
      size,
      title,
      username,
      sortBy,
      direction: direction ? 'asc' : 'desc',
    });

    const url = `${apiUrl}/patterns/${basePath}?${queryString}`;

    // Headers depend on whether the request is private
    const headers = isPrivate
      ? await getAuthHeaders()
      : { 'Content-Type': 'application/json' };

    // Fetch data from the API
    const response = await fetch(url, { method: 'GET', headers });

    const result = await handleResponse<PaginatedResponse<Pattern>>(response);

    return result;
  } catch (error) {
    // Return consistent error response
    return {
      error: error instanceof Error ? error.message : 'Unknown error occurred.',
      code: 500,
    };
  }
}
