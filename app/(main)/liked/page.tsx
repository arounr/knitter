import PatternContent from '@/ui/pattern-content';

export default function LikedPage() {
  return (
    <>
      <PatternContent
        showLikedPatterns={true}
        showAuthor={true}
        isPrivate={false}
        showPublicStatus={false}
      />
    </>
  );
}
