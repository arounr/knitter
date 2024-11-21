'use client';

import Form from 'next/form';
import React, { useState } from 'react';
import ColorMatrixTable from '@/component/color-matrix-table';
import { changePattern } from './action';
import SubmitButton from '@/ui/submit-button';
import { redirect } from 'next/navigation';

export const EditForm = ({
  color0,
  name0,
  pattern0,
  isPublic0,
  id,
}: {
  color0: Array<string>;
  name0: string;
  pattern0: Array<Array<number>>;
  isPublic0: boolean;
  id: number;
}) => {
  const [color, setColor] = useState(color0);
  const [name, setName] = useState(name0);
  const [pattern, setPattern] = useState(pattern0);
  const [isPublic, setIsPublic] = useState(isPublic0);
  const [currentColor, setCurrentColor] = useState(1);
  const colors = color.length;

  const handleCellClick = (rowIndex: number, cellIndex: number) => {
    const updatedMatrix = pattern.map((row, rIdx) =>
      row.map((cell, cIdx) =>
        rIdx === rowIndex && cIdx === cellIndex ? currentColor : cell,
      ),
    );
    setPattern(updatedMatrix); // Update the matrix state with a new object
  };

  return (
    <>
      <ColorMatrixTable
        matrix={pattern}
        colors={color}
        onCellClick={handleCellClick}
      />
      <Form
        action={async (formData: FormData) => {
          formData.append(
            'pattern',
            String(pattern.map((stak) => String(stak).replaceAll(',', ''))),
          );
          formData.append(
            'color',
            String(color.map((stak, nr) => (nr < colors ? stak : ''))),
          );
          formData.append('id', String(id));
          changePattern(formData);

          redirect(`/pattern/${id}`);
        }}
        className="mt-4"
      >
        <div className="flex flex-col">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-[var(--color-text-secondary)]"
          >
            Pattern Name: {name}
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
            defaultValue={name}
            className="w-full px-4 py-2 mt-1 bg-[var(--color-input-bg)] rounded-md focus:ring-2 focus:ring-[var(--color-button-bg)] focus:outline-none"
          />
        </div>

        <div className="flex items-center mt-4">
          <label
            htmlFor="public"
            className="text-sm font-medium text-[var(--color-text-secondary)] mr-2"
          >
            Public
          </label>
          <input
            type="checkbox"
            id="public"
            name="public"
            defaultChecked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
            className="cursor-pointer"
          />
        </div>

        <ol className="flex flex-wrap gap-4 justify-between mt-4">
          <li
            className={`flex flex-col items-center flex-grow border rounded-md p-4 cursor-pointer ${currentColor === 0 ? 'border-blue-500' : 'border-gray-300'}`}
            onClick={() => setCurrentColor(0)}
          >
            <p>Eraser</p>
            <div className="w-full max-w-[50px] h-10 text-center rounded-md border border-gray-300 bg-grey"></div>
          </li>
          {color.map((colorValue, index) => (
            <li
              key={'Color' + index}
              className={`flex flex-col items-center flex-grow border rounded-md p-4 cursor-pointer ${currentColor === index + 1 ? 'border-blue-500' : 'border-gray-300'}`}
              onClick={() => setCurrentColor(index + 1)}
            >
              <label htmlFor={'Color' + index}>Color {index + 1}</label>
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
                className="w-full max-w-[50px] h-10 text-center rounded-md border border-gray-300 hover:cursor-crosshair"
              />
            </li>
          ))}
        </ol>

        <SubmitButton
          className="w-full py-2 font-medium text-[var(--color-white-text)] bg-[var(--color-button-bg)] rounded-md hover:bg-[var(--color-button-bg-hover)] focus:ring-2 focus:ring-[var(--color-button-bg)] focus:outline-none mt-6"
          text="Save Pattern"
          loadingText="Saving Pattern..."
        />
      </Form>
    </>
  );
};
