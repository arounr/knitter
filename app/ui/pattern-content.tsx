'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PatternCard from '@/ui/pattern-card';
import SearchBar from '@/ui/search-bar';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Pattern } from '@/types/pattern';
import { fetchPatterns } from '@/(main)/catalog/action';

export default function PatternContent({ profile = null}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Catalog-specific states and logic
  const [page, setPage] = useState(parseInt(searchParams.get('page') || '0', 10));
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [titleSearchTerm, setTitleSearchTerm] = useState(searchParams.get('title') || '');
  const [authorSearchTerm, setAuthorSearchTerm] = useState(profile ? '' : searchParams.get('username') || '');
  const [sortOption, setSortOption] = useState(searchParams.get('sortBy') || 'creationDate');
  const [isAsc, setIsAsc] = useState(searchParams.get('direction') !== 'desc');
  const [tempTitle, setTempTitle] = useState(titleSearchTerm);
  const [tempAuthor, setTempAuthor] = useState(authorSearchTerm);
  const [tempSortOption, setTempSortOption] = useState(sortOption);
  const [tempIsAsc, setTempIsAsc] = useState(isAsc);
  const itemsPerPage = 12;

  const performSearch = () => {
    setPage(0);
    setTitleSearchTerm(tempTitle);
    setSortOption(tempSortOption);
    setIsAsc(tempIsAsc);

    if (!profile) {
      setAuthorSearchTerm(tempAuthor);
    }

    const params = new URLSearchParams();
    params.set('page', '0');
    if (tempTitle) params.set('title', tempTitle);
    if (tempAuthor && !profile) params.set('username', tempAuthor);
    if (tempSortOption) params.set('sortBy', tempSortOption);
    params.set('direction', tempIsAsc ? 'asc' : 'desc');

    router.push(`?${params.toString()}`, undefined);
  };

  useEffect(() => {
    const loadPatterns = async () => {
      setIsLoading(true);
      setError(null);
      
      const result = await fetchPatterns(!!profile, page, itemsPerPage, titleSearchTerm, profile ? '' : authorSearchTerm, sortOption, isAsc);
  
      if (result.error) {
        setError(result.error); // Display the error message returned by fetchPatterns
      } else {
        setPatterns(result.patterns as Pattern[]);
        setTotalPages(result.totalPages);
      }
  
      setIsLoading(false);
    };
  
    loadPatterns();
  }, [page, itemsPerPage, titleSearchTerm, authorSearchTerm, sortOption, isAsc, profile]);
  

  const handlePatternClick = (id: number) => {
    router.push(`/pattern/${id}`);
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-8">
      <div className="max-w-4xl w-full space-y-8 relative">
        {/* Search Bar */}
        <SearchBar
          title={tempTitle}
          onTitleChange={setTempTitle}
          author={tempAuthor}
          onAuthorChange={setTempAuthor}
          sortOption={tempSortOption}
          onSortOptionChange={setTempSortOption}
          isAsc={tempIsAsc}
          onSortDirectionToggle={() => setTempIsAsc(!tempIsAsc)}
          onSearch={performSearch}
          showAuthorSearch={!profile}
        />

        {/* Main Content Area */}
        <div className="flex flex-col items-center w-full bg-[var(--color-card-bg)] p-4 rounded-lg shadow-md relative">
          {isLoading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="loader ease-linear rounded-full border-4 border-t-4 border-[var(--color-button-bg)] h-10 w-10 mb-4"></div>
              <p className="text-[var(--color-text-secondary)] ml-4">Loading patterns...</p>
            </div>
          ) : error ? (
            <div className="text-center text-[var(--color-error)]">
              {error}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
              {patterns.length ? (
                patterns.map((pattern) => (
                  <PatternCard
                    key={pattern.id}
                    title={pattern.title}
                    author={profile ? undefined : pattern.ownerUsername} // omit author if in library view
                    imageUrl={pattern.imageUrl || undefined}
                    date={pattern.creationDate}
                    likes={pattern.likeCount}
                    onClick={() => handlePatternClick(pattern.id)}
                    isPublic={profile ? pattern.isPublic : undefined} // only show public/private status when in library view
                  />
                ))
              ) : (
                <p className="text-center text-[var(--color-text-secondary)] col-span-full">No patterns found.</p>
              )}
            </div>
          )}

          {/* Pagination Controls */}
          <FaArrowLeft
            onClick={() => page > 0 && setPage(page - 1)}
            className={`absolute left-[-30px] top-1/2 transform -translate-y-1/2 text-2xl ${
              page > 0 ? 'text-[var(--color-text-primary)] cursor-pointer' : 'text-gray-400 cursor-default'
            }`}
          />
          <FaArrowRight
            onClick={() => page + 1 < totalPages && setPage(page + 1)}
            className={`absolute right-[-30px] top-1/2 transform -translate-y-1/2 text-2xl ${
              page + 1 < totalPages ? 'text-[var(--color-text-primary)] cursor-pointer' : 'text-gray-400 cursor-default'
            }`}
          />
        </div>
      </div>
    </div>
  );
}