'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PatternCard from '@/ui/pattern-card';
import { fetchPatterns } from './action';

export default function CatalogPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPage = parseInt(searchParams.get('page') || '0', 10);
  const [page, setPage] = useState(initialPage);
  const [patterns, setPatterns] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const loadPatterns = async () => {
      const result = await fetchPatterns(page, itemsPerPage);
      if (result.error) {
        console.error(result.error);
      } else {
        setPatterns(result.patterns);
        setTotalPages(result.totalPages);
      }
    };
    loadPatterns();
  }, [page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    router.push(`?page=${newPage}`, undefined);
  };

  return (
    <div className="p-4">
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search patterns..."
          className="w-full p-3 rounded-md bg-[var(--color-input-bg)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-button-bg)]"
        />
      </div>

      {/* Patterns Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {patterns.map((pattern) => (
          <PatternCard
            key={pattern.id}
            title={pattern.title}
            author={pattern.ownerUsername}
            imageUrl={pattern.imageUrl || undefined} // will probably generate a thumbnail on the backend and pass url
          />
        ))}
      </div>

      {/* Pagination Arrows */}
      <div className="flex justify-center space-x-4 mt-8">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 0}
          className="px-4 py-2 bg-[var(--color-button-bg)] text-white rounded-md hover:bg-[var(--color-button-bg-hover)] disabled:opacity-50"
        >
          &larr; Previous
        </button>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page + 1 >= totalPages}
          className="px-4 py-2 bg-[var(--color-button-bg)] text-white rounded-md hover:bg-[var(--color-button-bg-hover)] disabled:opacity-50"
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
}
