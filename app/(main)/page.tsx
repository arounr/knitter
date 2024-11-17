import PatternCard from '@/ui/pattern-card';
import { Pattern } from '@/types/pattern';
import Link from 'next/link';
import { getMostLikedPatterns } from './action';
import Image from 'next/image';

const mostLikedPatterns = (await getMostLikedPatterns(6)) as Pattern[];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center px-4">
      <div className="mt-12 mb-12">
        <h1 className="text-4xl font-bold">Welcome to Knitter</h1>
        <h2>the knitting machine pattern making plaform</h2>
      </div>

      {/* Most liked Patterns Section */}
      <h2 className="text-lg font-medium text-[var(--color-text-primary)] mb-4 center">
        Take a look the most liked Patterns
      </h2>

      {mostLikedPatterns.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mostLikedPatterns.map((pattern) => (
            <div
              key={pattern.id}
              className="p-4 rounded-lg bg-[var(--color-input-bg)] shadow-md"
            >
              <PatternCard
                id={pattern.id}
                title={pattern.title}
                author={pattern.ownerUsername}
                imageUrl={pattern.imageUrl}
                date={pattern.creationDate}
                likes={pattern.likeCount}
                isPublic={true}
              />

              <Link
                href="/catalog"
                className="text-[var(--color-button-bg)] hover:text-[var(--color-button-bg-hover)] underline font-medium"
              >
                View Catalog
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center bg-[var(--color-input-bg)] p-6 rounded-lg shadow-md">
          <p className="text-[var(--color-text-secondary)] mb-4">
            no public patterns created yet.
          </p>
        </div>
      )}

      {/*"Create Your Own Pattern" section */}
      <div className="relative group w-1/3 h-52 mt-4 mb-4 rounded-lg overflow-hidden">
        <Image
          src="/images/ragnheidur2.png"
          alt="Banner"
          layout="fill"
          objectFit="cover"
          priority
        />

        {/* Text overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Link
            href="/pattern"
            className="text-white text-2xl font-semibold px-6 py-3 text-center"
          >
            Create a Pattern
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <h2>Don't have an account yet?</h2>
        <Link
          href="/register"
          className="text-[var(--color-button-bg)] hover:text-[var(--color-button-bg-hover)] font-medium"
        >
          Click here to register
        </Link>
      </div>
    </div>
  );
}
