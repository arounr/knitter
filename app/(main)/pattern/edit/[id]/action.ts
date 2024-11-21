import { getApiUrl, ServerError } from '@/utils/apiUtils';
import { getAuthHeaders } from '@/utils/serverApiUtils';

export const changePattern = async (formData: FormData) => {
  const title = String(formData.get('name'));
  const isPublic = formData.get('public') == 'on';
  const pm = String(formData.get('pattern')).split(',')
  const color = String(formData.get('color')).split(',').filter(v => v)
  const id = Number.parseInt(String(formData.get('id')))
  try {
    const apiUrl = getApiUrl();
    if (!apiUrl) throw ServerError;

    const headers = await getAuthHeaders(false);

    const response = await fetch(`${apiUrl}/patterns/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: JSON.stringify(
        {
          title,
          isPublic,
          patternMatrix: pm,
          colorCodes: color
        }
      )
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        error: errorData.message || 'Failed to save pattern',
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