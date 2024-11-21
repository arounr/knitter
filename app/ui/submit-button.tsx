'use client';

import { useFormStatus } from 'react-dom';

interface SubmitButtonProps {
  className?: string;
  text?: string;
  loadingText?: string;
  disabled?: boolean;
}

// For forms
export default function SubmitButton({
  className = '',
  text = 'Login',
  loadingText = 'Logging in...',
  disabled = false,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button disabled={disabled || pending} type="submit" className={className}>
      {pending ? loadingText : text}
    </button>
  );
}
