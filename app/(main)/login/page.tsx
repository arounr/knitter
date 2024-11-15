'use client';

import Form from 'next/form';
import { login } from './action';
import { useState } from 'react';
import Link from 'next/link';
import SubmitButton from '@/ui/submit-button';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  async function handleSubmit(formData: FormData) {
    const result = await login(formData);
    if (result.error) {
      if (Array.isArray(result.error)) {
        setErrors(result.error);
      } else {
        setErrors([result.error]);
      }
    } else {
      setErrors([]);
      window.location.href = '/';
    }
  }

  return (
    <main className="flex flex-col items-center p-8 font-sans text-[var(--color-text-primary)]">
      <section className="w-full max-w-sm text-center mb-4">
        <h1 className="text-3xl font-semibold text-[var(--color-text-primary)]">
          Knitter
        </h1>
        <p className="text-[var(--color-text-secondary)] text-sm mt-2">
          Welcome! Please login to continue.
        </p>
      </section>

      <section className="flex flex-col items-center w-full max-w-sm p-8 space-y-6 bg-[var(--color-card-bg)] rounded-lg shadow-lg sm:p-12">
        <Form
          action={handleSubmit}
          className="w-full space-y-4 flex flex-col items-center"
        >
          <div className="w-full">
            <label
              className="block text-sm font-medium text-[var(--color-text-secondary)]"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 mt-1 bg-[var(--color-input-bg)] rounded-md focus:ring-2 focus:ring-[var(--color-button-bg)] focus:outline-none"
              required
            />
          </div>

          <div className="w-full">
            <label
              className="block text-sm font-medium text-[var(--color-text-secondary)]"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 bg-[var(--color-input-bg)] rounded-md focus:ring-2 focus:ring-[var(--color-button-bg)] focus:outline-none"
              required
            />
          </div>

          {errors.length > 0 && (
            <div className="text-sm text-[var(--color-error)] mt-2 text-center space-y-1">
              {errors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}

          <SubmitButton className="w-4/5 py-2 mt-4 font-medium text-[var(--color-white-text)] bg-[var(--color-button-bg)] rounded-md hover:bg-[var(--color-button-bg-hover)] focus:ring-2 focus:ring-[var(--color-button-bg)] focus:outline-none" />
        </Form>

        <Link href="/register" passHref>
          <button className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">
            Register
          </button>
        </Link>
      </section>
    </main>
  );
}
