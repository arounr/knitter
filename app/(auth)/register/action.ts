'use server';

export async function register(formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    return { error: 'API URL is not defined' };
  }

  try {
    const response = await fetch(`${apiUrl}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData)
      if (response.status === 400 && errorData.errors) {
        return { error: Object.values(errorData.errors) };
      }

      return { error: errorData.message || String(errorData) };
    }

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
