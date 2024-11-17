'use client';

import React from 'react';
import PatternCard from '@/ui/pattern-card';
import SearchBar from '@/component/search-bar';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Pattern } from '@/types/pattern';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}

interface SearchProps {
  title: string;
  onTitleChange: (value: string) => void;
  author: string;
  onAuthorChange: (value: string) => void;
  sortOption: string;
  onSortOptionChange: (value: string) => void;
  isAsc: boolean;
  onSortDirectionToggle: () => void;
  showAuthorSearch: boolean;
}

interface PatternContentProps {
  patterns: Pattern[];
  isLoading: boolean;
  error: string | null;
  onSearch: () => void;
  searchProps: SearchProps;
  pagination: PaginationControlsProps;
  showPublicStatus?: boolean; // New prop added
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}) => {
  return (
    <div className="flex justify-center items-center space-x-4 mt-4">
      <button
        onClick={onPrevious}
        disabled={currentPage === 0}
        className={
          'flex items-center px-3 py-2 bg-[var(--color-button-bg)] text-white rounded-md hover:bg-[var(--color-button-bg-hover)] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200'
        }
      >
        <FaArrowLeft className="mr-2" />
        Previous
      </button>
      <span className="text-[var(--color-text-secondary)]">
        Page {currentPage + 1} of {totalPages}
      </span>
      <button
        onClick={onNext}
        disabled={currentPage + 1 >= totalPages}
        className={
          'flex items-center px-3 py-2 bg-[var(--color-button-bg)] text-white rounded-md hover:bg-[var(--color-button-bg-hover)] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200'
        }
      >
        Next
        <FaArrowRight className="ml-2" />
      </button>
    </div>
  );
};

const PatternContent: React.FC<PatternContentProps> = ({
  patterns,
  isLoading,
  error,
  onSearch,
  searchProps,
  pagination,
  showPublicStatus = false,
}) => {
  return (
    <div className="flex flex-col items-center p-4 space-y-8">
      <div className="max-w-4xl w-full space-y-8 relative">
        {/* Search Bar */}
        <SearchBar
          title={searchProps.title}
          onTitleChange={searchProps.onTitleChange}
          author={searchProps.author}
          onAuthorChange={searchProps.onAuthorChange}
          sortOption={searchProps.sortOption}
          onSortOptionChange={searchProps.onSortOptionChange}
          isAsc={searchProps.isAsc}
          onSortDirectionToggle={searchProps.onSortDirectionToggle}
          onSearch={onSearch}
          showAuthorSearch={searchProps.showAuthorSearch}
        />

        {/* Main Content Area */}
        <div className="flex flex-col items-center w-full bg-[var(--color-card-bg)] p-4 rounded-lg shadow-md relative">
          {isLoading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="loader ease-linear rounded-full border-4 border-t-4 border-[var(--color-button-bg)] h-10 w-10 mb-4 animate-spin"></div>
              <p className="text-[var(--color-text-secondary)] ml-4">
                Loading patterns...
              </p>
            </div>
          ) : error ? (
            <div className="text-center text-[var(--color-error)]">{error}</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
              {patterns.length ? (
                patterns.map((pattern) => (
                  <PatternCard
                    id={pattern.id}
                    key={pattern.id}
                    title={pattern.title}
                    author={pattern.ownerUsername}
                    imageUrl={pattern.imageUrl || undefined}
                    date={pattern.creationDate}
                    likes={pattern.likeCount}
                    isPublic={pattern.isPublic}
                    showPublicStatus={showPublicStatus} // Pass down the prop
                  />
                ))
              ) : (
                <p className="text-center text-[var(--color-text-secondary)] col-span-full">
                  No patterns found.
                </p>
              )}
            </div>
          )}

          {/* Pagination Controls */}
          <PaginationControls
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPrevious={pagination.onPrevious}
            onNext={pagination.onNext}
          />
        </div>
      </div>
    </div>
  );
};

export default PatternContent;
