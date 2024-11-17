'use client';

import React from 'react';
import ErrorMessage from './error-message';

interface ServerErrorProps {
  message?: string;
  buttonTitle?: string;
  clickAction?: () => void;
}

export default function ServerError({
  message = '500 Internal Server Error. Something went wrong on our end. Please try again later.',
  buttonTitle = 'Go Back',
  clickAction,
}: ServerErrorProps) {
  return (
    <ErrorMessage
      headerTitle="Server Error"
      message={message}
      buttonTitle={buttonTitle}
      clickAction={clickAction}
    />
  );
}
