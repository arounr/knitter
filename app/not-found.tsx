import ErrorMessage from '@/ui/error-message';

export default function NotFoundCatchAll() {
  return (
    <ErrorMessage
      headerTitle="404 - Page Not Found"
      message="Sorry, the page you are looking for does not exist."
    />
  );
}
