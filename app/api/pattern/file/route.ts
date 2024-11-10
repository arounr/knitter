import { NextRequest, NextResponse } from 'next/server';
import FormData from 'form-data';
import axios from 'axios';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('multipart/form-data')) {
      return NextResponse.json({ error: 'Invalid content type' }, { status: 400 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const width = formData.get('width');
    const numColors = formData.get('numColors');

    if (!file || !width || !numColors) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const backendFormData = new FormData();
    backendFormData.append('file', buffer, file.name);
    backendFormData.append('width', width);
    backendFormData.append('numColors', numColors);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      return NextResponse.json({ error: 'API URL is not defined' }, { status: 500 });
    }

    const response = await axios.post(`${apiUrl}/patterns/file`, backendFormData, {
      headers: backendFormData.getHeaders(),
    });
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
