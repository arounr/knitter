// Pattern.tsx
'use client'
import { useEffect, useState } from 'react';
import Form from 'next/form';
import { newUrlPattern } from './action';
import SubmitButton from '@/ui/submit-button';
import ColorMatrixTable from '@/ui/color-matrix-table';
import FileUploadComponent from '@/ui/file-upload-component';

export default function Pattern() {
  const [colors, setColors] = useState(3);
  const [color, setColor] = useState(['#A8DADC', '#A7D49B', '#CDB4DB', '#F7D794']);
  const [name, setName] = useState('');
  const [select, setSelect] = useState(false);
  const [method, setMethod] = useState('');
  const [urlValue, setUrlValue] = useState('');
  const [width, setWidth] = useState(100);
  const [pattern, setPattern] = useState<number[][] | null>(null); // Pattern as matrix

  const [displayedText, setDisplayedText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const words = ['url', 'uploading', 'creating'];

  useEffect(() => {
    if (select) return;
    const typeInterval = setInterval(() => {
      const currentWord = words[currentWordIndex];

      if (currentLetterIndex < currentWord.length) {
        setDisplayedText((prev) => prev + currentWord[currentLetterIndex]);
        setCurrentLetterIndex((prev) => prev + 1);
      } else {
        setTimeout(() => {
          setDisplayedText('');
          setCurrentLetterIndex(0);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }, 1000);
      }
    }, 200);
    return () => clearInterval(typeInterval);
  });

  return (
    <>
      <Form action="/pattern">
        <h1>{name}</h1>
        <fieldset>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            minLength={1}
            maxLength={128}
            size={20}
            onChange={(e) => setName(e.target.value)}
            defaultValue=""
            className="text-black"
          />
          <label htmlFor="public">Public:</label>
          <input type="checkbox" id="public" name="public" defaultChecked />
        </fieldset>
        <fieldset>
          <div className="flex flex-col">
            <label htmlFor="colors">Colors: {colors}</label>
            <input
              type="range"
              id="colors"
              name="colors"
              min={1}
              max={4}
              step={1}
              value={colors}
              onChange={(e) => setColors(Number.parseInt(e.target.value) || colors)}
            />
          </div>

          <ol className="flex flex-row space-x-4">
            {color.map((stak, nr) => (
              nr < colors ?
                <li key={'Color' + nr} className="flex flex-col items-center">
                  <label htmlFor={'Color' + nr}>Color {nr + 1}</label>
                  <input
                    type="color"
                    id={'Color' + nr}
                    name={'Color' + nr}
                    value={stak}
                    onChange={(e) =>
                      setColor(
                        color.map((stak2, nr2) => (nr2 === nr ? e.target.value : stak2))
                      )
                    }
                    className="w-16 h-10 text-center"
                  />
                  <span className="text-sm mt-1">{stak}</span>
                </li> : <div key={'Color' + nr} className="flex flex-col items-center" ></div>
            ))}
          </ol>

          <div className="flex flex-col">
            <label htmlFor="width">Width {width}</label>
            <input
              type="range"
              id="width"
              name="width"
              min={1}
              max={179}
              step={1}
              value={width}
              onChange={(e) => setWidth(Number.parseInt(e.target.value) || width)}
            />
          </div>
        </fieldset>
        <fieldset className="flex flex-col space-y-4">
          <label htmlFor="avenue">Make a pattern by</label>
          <select
            name="avenue"
            id="avenue"
            className="text-black border rounded px-2 py-1"
            onClick={() => setSelect(true)}
            onChange={(e) => setMethod(e.target.value)}
            value={method}
          >
            {!select && <option value="">{displayedText}</option>}
            {words.map((stak) => (
              <option value={stak} key={stak}>
                {stak}
              </option>
            ))}
          </select>

          {method === 'url' && (
            <>
              <input
                type="url"
                className="border rounded px-2 py-1 text-black"
                onChange={(e) => setUrlValue(e.target.value)}
              />
              <button
                type="button"
                className="border-b border-white rounded-lg px-2 py-1"
                onClick={(e) => {
                  e.preventDefault();
                  newUrlPattern(urlValue, width, colors).then((data) => {
                    if (typeof data === 'string') setPattern(JSON.parse(data));
                  });
                }}
              >
                Make pattern
              </button>
            </>
          )}
          {method === 'uploading' && (
            <FileUploadComponent width={width} numColors={colors} setPattern={setPattern} />
          )}
          {method === 'creating' && <p>Coming soon!</p>}
        </fieldset>
        <fieldset>
          {pattern && <ColorMatrixTable matrix={pattern} colors={color} />}
        </fieldset>
        <SubmitButton className="border-b border-white rounded-lg px-2 py-1" text="save" />
      </Form>
    </>
  );
}
