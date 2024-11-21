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

      const data = await response.json();
      setPattern(data);
    } catch (e) {
      console.error(e);
      setError(String(e));
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <input
        type="file"
        onChange={(e) => e.target.files && setFile(e.target.files[0])}
        className="border rounded px-2 py-1 bg-white text-black"
        accept="image/png, image/jpeg"
      />
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="m-4 px-5 py-2 bg-[var(--color-button-bg)] text-white rounded-md hover:bg-[var(--color-button-bg-hover)]"
      >
        Upload and Generate Pattern
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default FileUploadComponent;
