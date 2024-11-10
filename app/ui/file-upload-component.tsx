// FileUploadComponent.tsx
import React, { useState } from 'react';

function FileUploadComponent({
  width,
  numColors,
  setPattern,
}: {
  width: number;
  numColors: number;
  setPattern: (pattern: number[][]) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!file) {
      console.error('No file selected');
      setError('No file selected');
      return;
    }
    setError('');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('width', String(width));
    formData.append('numColors', String(numColors));

    try {
      const response = await fetch('/api/pattern/file', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${errorText}`);
      }

      const data = await response.json(); // Assuming data is a matrix (e.g., [[1, 2, 3], [4, 5, 6]])
      console.log('Received matrix data:', data);
      setPattern(data); // Pass matrix data back to the parent component
    } catch (e) {
      console.error(e);
      setError(String(e));
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => e.target.files && setFile(e.target.files[0])} />
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        Upload and Generate Pattern
      </button>
      {error && <p>{error}</p>}
    </div>
  );
}

export default FileUploadComponent;
