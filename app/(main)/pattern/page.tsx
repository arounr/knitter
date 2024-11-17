'use client';

import { useEffect, useMemo, useState } from 'react';
import Form from 'next/form';
import { newUrlPattern } from './action';
import SubmitButton from '@/ui/submit-button';
import ColorMatrixTable from '@/component/color-matrix-table';
import FileUploadComponent from '@/ui/file-upload-component';

export default function Pattern() {
  const [colors, setColors] = useState(3);
  const [color, setColor] = useState([
    '#A8DADC',
    '#A7D49B',
    '#CDB4DB',
    '#F7D794',
  ]);
  const [_, setName] = useState('');
  const [select, setSelect] = useState(false);
  const [method, setMethod] = useState('');
  const [urlValue, setUrlValue] = useState('');
  const [width, setWidth] = useState(100);
  const [pattern, setPattern] = useState<number[][] | null>(null);
  const [displayedText, setDisplayedText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const words = useMemo(() => ['url', 'uploading', 'creating'], []);

  useEffect(() => {
    if (select) return;

    if (currentWordIndex < words.length) {
      const currentWord = words[currentWordIndex];

      if (currentLetterIndex < currentWord.length) {
        const timeoutId = setTimeout(() => {
          setDisplayedText((prev) => prev + currentWord[currentLetterIndex]);
          setCurrentLetterIndex((prev) => prev + 1);
        }, 200);
        return () => clearTimeout(timeoutId);
      } else {
        const timeoutId = setTimeout(() => {
          setDisplayedText('');
          setCurrentLetterIndex(0);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }, 1000);
        return () => clearTimeout(timeoutId);
      }
    }
  }, [select, currentWordIndex, currentLetterIndex, words]);

  return (
    <main className="flex flex-col items-center p-8 font-sans text-[var(--color-text-primary)]">
      <section className="w-full max-w-2xl text-center mb-4">
        <h1 className="text-3xl font-semibold text-[var(--color-text-primary)]">
          Create a Pattern (WIP)
        </h1>
        <p className="text-[var(--color-text-secondary)] text-sm mt-2">
          Customize and save your pattern with various settings.
        </p>
      </section>

      <section className="flex flex-col items-center w-full max-w-2xl p-8 space-y-6 bg-[var(--color-card-bg)] rounded-lg shadow-lg sm:p-12">
        <Form action="/pattern" className="w-full space-y-6 flex flex-col">
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-[var(--color-text-secondary)]"
            >
              Pattern Name
            </label>
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
              className="w-full px-4 py-2 mt-1 bg-[var(--color-input-bg)] rounded-md focus:ring-2 focus:ring-[var(--color-button-bg)] focus:outline-none"
            />
          </div>

          <div className="flex items-center">
            <label
              htmlFor="public"
              className="text-sm font-medium text-[var(--color-text-secondary)] mr-2"
            >
              Public
            </label>
            <input type="checkbox" id="public" name="public" defaultChecked />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="colors"
              className="text-sm font-medium text-[var(--color-text-secondary)]"
            >
              Number of Colors: {colors}
            </label>
            <input
              type="range"
              id="colors"
              name="colors"
              min={1}
              max={4}
              step={1}
              value={colors}
              onChange={(e) =>
                setColors(Number.parseInt(e.target.value) || colors)
              }
              className="w-full"
            />
          </div>

          <ol className="flex flex-wrap space-x-4">
            {color.map((colorValue, index) =>
              index < colors ? (
                <li
                  key={'Color' + index}
                  className="flex flex-col items-center"
                >
                  <label
                    htmlFor={'Color' + index}
                    className="text-sm text-[var(--color-text-secondary)]"
                  >
                    Color {index + 1}
                  </label>
                  <input
                    type="color"
                    id={'Color' + index}
                    name={'Color' + index}
                    value={colorValue}
                    onChange={(e) =>
                      setColor(
                        color.map((c, i) => (i === index ? e.target.value : c)),
                      )
                    }
                    className="w-16 h-10 text-center rounded-md"
                  />
                </li>
              ) : null,
            )}
          </ol>

          <div className="flex flex-col">
            <label
              htmlFor="width"
              className="text-sm font-medium text-[var(--color-text-secondary)]"
            >
              Pattern Width: {width}
            </label>
            <input
              type="range"
              id="width"
              name="width"
              min={1}
              max={179}
              step={1}
              value={width}
              onChange={(e) =>
                setWidth(Number.parseInt(e.target.value) || width)
              }
              className="w-full"
            />
          </div>

          <div className="flex flex-col space-y-4">
            <label
              htmlFor="avenue"
              className="text-sm font-medium text-[var(--color-text-secondary)]"
            >
              Make a Pattern By
            </label>
            <select
              name="avenue"
              id="avenue"
              className="w-full px-4 py-2 bg-[var(--color-input-bg)] rounded-md focus:ring-2 focus:ring-[var(--color-button-bg)] focus:outline-none"
              onClick={() => setSelect(true)}
              onChange={(e) => setMethod(e.target.value)}
              value={method}
            >
              {!select && <option value="">{displayedText}</option>}
              {words.map((option) => (
                <option value={option} key={option}>
                  {option}
                </option>
              ))}
            </select>

            {method === 'url' && (
              <>
                <input
                  type="url"
                  placeholder="Enter URL"
                  className="w-full px-4 py-2 bg-[var(--color-input-bg)] rounded-md focus:ring-2 focus:ring-[var(--color-button-bg)] focus:outline-none"
                  onChange={(e) => setUrlValue(e.target.value)}
                />
                <button
                  type="button"
                  className="w-full py-2 font-medium text-[var(--color-primary-text)] bg-[var(--color-button-bg)] rounded-md hover:bg-[var(--color-button-bg-hover)]"
                  onClick={(e) => {
                    e.preventDefault();
                    newUrlPattern(urlValue, width, colors).then((data) => {
                      if (typeof data === 'string')
                        setPattern(JSON.parse(data));
                    });
                  }}
                >
                  Generate Pattern
                </button>
              </>
            )}
            {method === 'uploading' && (
              <FileUploadComponent
                width={width}
                numColors={colors}
                setPattern={setPattern}
              />
            )}
            {method === 'creating' && (
              <p className="text-[var(--color-text-secondary)]">Coming soon!</p>
            )}
          </div>

          <div className="w-full">
            {pattern && <ColorMatrixTable matrix={pattern} colors={color} />}
          </div>

          <SubmitButton
            className="w-full py-2 font-medium text-[var(--color-primary-text)] bg-[var(--color-button-bg)] rounded-md hover:bg-[var(--color-button-bg-hover)] focus:ring-2 focus:ring-[var(--color-button-bg)] focus:outline-none"
            text="Save Pattern"
          />
        </Form>
      </section>
    </main>
  );
}
