'use server';

import { Notification } from './types/notification';
import { ApiResponse, getApiUrl, ServerError } from './utils/apiUtils';
import { getAuthHeaders, handleResponse } from './utils/serverApiUtils';

export async function getNotifications(): Promise<ApiResponse<Notification>> {
  try {
    const apiUrl = getApiUrl();
    if (!apiUrl) throw ServerError;

    const headers = await getAuthHeaders();
    const response = await fetch(`${apiUrl}/users/notifications`, {
      method: 'GET',
      headers,
    });

    return await handleResponse<Notification>(response);
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Unknown error occurred.',
      code: 500,
    };
  }
}

export async function declineNotification(
  id: number,
): Promise<ApiResponse<{ success: boolean }>> {
  try {
    const apiUrl = getApiUrl();
    if (!apiUrl) throw ServerError;

    const headers = await getAuthHeaders();
    const response = await fetch(
      `${apiUrl}/users/notifications/${id}/decline`,
      {
        method: 'POST',
        headers,
      },
    );

    return await handleResponse<{ success: boolean }>(response);
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Unknown error occurred.',
      code: 500,
    };
  }
}

export async function acceptNotification(
  id: number,
): Promise<ApiResponse<{ success: boolean }>> {
  try {
    const apiUrl = getApiUrl();
    if (!apiUrl) throw ServerError;

    const headers = await getAuthHeaders();
    const response = await fetch(`${apiUrl}/users/notifications/${id}/accept`, {
      method: 'POST',
      headers,
    });

    return await handleResponse<{ success: boolean }>(response);
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Unknown error occurred.',
      code: 500,
    };
  }
}
