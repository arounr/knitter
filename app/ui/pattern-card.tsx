import Image from 'next/image';

interface PatternCardProps {
    title: string;
    author: string;
    imageUrl?: string;
  }
  
export default function PatternCard({ title, author, imageUrl }: PatternCardProps) {
  return (
    <div
      className="w-40 h-50 p-4 bg-[var(--color-card-bg)] shadow-md rounded-lg flex flex-col items-center space-y-2"
      style={{ color: 'var(--color-text-primary)' }}
    >
      {/* Image */}
      <div className="w-full h-32 bg-gray-200 rounded-lg overflow-hidden">
        {imageUrl ? (
          <Image src={imageUrl} alt={`${title} pattern`} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
              No Image Available
          </div>
        )}
      </div>
  
      {/* Title */}
      <h3 className="text-center text-lg font-medium" style={{ color: 'var(--color-text-primary)' }}>
        {title}
      </h3>
  
      {/* Author */}
      <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          by {author}
      </p>
    </div>
  );
}
  