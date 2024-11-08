'use client'

import { useFormStatus } from 'react-dom'

interface SubmitButtonProps {
  className?: string;
  text?: string;
  loadingText?: string;
}

// For forms
export default function SubmitButton({
  className = '',
  text = 'Login',
  loadingText = 'Logging in...',
}: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={className}>
      {pending ? loadingText : text}
    </button>
  );
}
