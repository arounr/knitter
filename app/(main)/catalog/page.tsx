'use client';

import React, { useState, useEffect } from 'react';
import PatternContent from '@/component/pattern-content';
import { Pattern } from '@/types/pattern';
import { fetchPatterns } from '@/(main)/catalog/action';

const CatalogPage: React.FC = () => {
  // Holds the array of public patterns
  const [patterns, setPatterns] = useState<Pattern[]>([]);

  // Indicates if data is being loaded
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Stores any error messages during data fetching
  const [error, setError] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Search and sort state
  const [titleSearchTerm, setTitleSearchTerm] = useState<string>('');
  const [authorSearchTerm, setAuthorSearchTerm] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('creationDate');
  const [isAsc, setIsAsc] = useState<boolean>(true);

  const itemsPerPage = 12;

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Fetch all public patterns
      const result = await fetchPatterns(
        false, // isPrivate: false for public patterns
        currentPage,
        itemsPerPage,
        titleSearchTerm,
        authorSearchTerm,
        sortOption,
        isAsc,
      );

      if ('error' in result) {
        setError(result.error);
      } else {
        setPatterns(result.data.content as Pattern[]);
        setTotalPages(result.data.totalPages);
      }
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const performSearch = () => {
    setCurrentPage(0);
    fetchData();
  };

  const handlePrevious = () => {
    if (currentPage > 0) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage + 1 < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <>
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-bold text-[var(--color-text-primary)]">
          Explore the Catalog
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)] mt-2">
          Discover a wide range of patterns shared by the community.
        </p>
      </div>
      <PatternContent
        patterns={patterns}
        isLoading={isLoading}
        error={error}
        onSearch={performSearch}
        searchProps={{
          title: titleSearchTerm,
          onTitleChange: setTitleSearchTerm,
          author: authorSearchTerm,
          onAuthorChange: setAuthorSearchTerm,
          sortOption: sortOption,
          onSortOptionChange: setSortOption,
          isAsc: isAsc,
          onSortDirectionToggle: () => setIsAsc((prev) => !prev),
          showAuthorSearch: true,
        }}
        pagination={{
          currentPage: currentPage,
          totalPages: totalPages,
          onPrevious: handlePrevious,
          onNext: handleNext,
        }}
        showPublicStatus={false}
      />
    </>
  );
};

export default CatalogPage;
