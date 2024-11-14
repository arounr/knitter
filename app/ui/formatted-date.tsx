'use client';

import { useEffect, useState } from 'react';

interface FormattedDateProps {
  dateString: string;
}

export default function FormattedDate({ dateString }: FormattedDateProps) {
  const [formattedDate, setFormattedDate] = useState<string | null>(null);

  useEffect(() => {
    const date = new Date(dateString);
    const clientFormattedDate = date.toLocaleDateString(undefined, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    setFormattedDate(clientFormattedDate);
  }, [dateString]);

  // Render only on the client side
  if (!formattedDate) {
    return null;
  }

  return <span suppressHydrationWarning>{formattedDate}</span>;
}
