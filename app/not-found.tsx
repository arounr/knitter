import ErrorMessage from '@/ui/error-message';

export default function NotFoundCatchAll() {
  return (
    <div
      className={'flex-grow flex flex-col items-center justify-center w-full'}
    >
      <ErrorMessage
        headerTitle="404 - Page Not Found"
        message="Sorry, the page you are looking for does not exist."
      />
    </div>
  );
}
