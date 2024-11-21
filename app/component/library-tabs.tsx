'use client';

import { useState, useEffect } from 'react';
import PatternContent from '@/component/pattern-content';
import { Pattern } from '@/types/pattern';
import { fetchPatterns } from '@/(main)/catalog/action';
import { getLikedPatterns, getSharedPatterns } from '@/(main)/library/actions';

type Tab = 'private' | 'liked' | 'shared';

const LibraryTabs = () => {
  const [activeTab, setActiveTab] = useState<Tab>('private');

  // State for patterns
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [isLoading, setIsLoading] = useState(false);
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

  // Function to fetch data based on active tab
  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      let result;
      if (activeTab === 'liked') {
        result = await getLikedPatterns(
          currentPage,
          itemsPerPage,
          titleSearchTerm,
          authorSearchTerm,
          sortOption,
          isAsc,
        );
      } else if (activeTab === 'shared') {
        result = await getSharedPatterns(
          currentPage,
          itemsPerPage,
          titleSearchTerm,
          authorSearchTerm,
          sortOption,
          isAsc,
        );
      } else if (activeTab === 'private') {
        const isPrivate = true;
        result = await fetchPatterns(
          isPrivate,
          currentPage,
          itemsPerPage,
          titleSearchTerm,
          isPrivate ? '' : authorSearchTerm,
          sortOption,
          isAsc,
        );
      }

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
  }, [activeTab, currentPage]);

  const performSearch = () => {
    setCurrentPage(0);
    fetchData();
  };

  const handlePrevious = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage + 1 < totalPages) setCurrentPage(currentPage + 1);
  };

  const getHeaderText = () => {
    switch (activeTab) {
      case 'private':
        return {
          title: 'Your Private Patterns',
          description: 'Manage your private collection of patterns.',
        };
      case 'liked':
        return {
          title: 'Liked Patterns',
          description: 'View patterns you have liked.',
        };
      case 'shared':
        return {
          title: 'Shared Patterns',
          description: 'Explore patterns shared with you.',
        };
      default:
        return {
          title: 'Library',
          description: 'Explore your patterns.',
        };
    }
  };

  const { title, description } = getHeaderText();

  return (
    <div className="w-full">
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-bold text-[var(--color-text-primary)]">
          {title}
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)] mt-2">
          {description}
        </p>
      </div>

      <div
        role="tablist"
        aria-label="Library Sections"
        className="flex justify-center border-b border-[var(--color-input-bg)] bg-transparent"
      >
        {/* Private Tab */}
        <button
          role="tab"
          aria-selected={activeTab === 'private'}
          onClick={() => setActiveTab('private')}
          className={`px-4 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none ${
            activeTab === 'private'
              ? 'text-[var(--color-button-bg)] border-b-2 border-[var(--color-button-bg)]'
              : 'text-[var(--color-text-secondary)] hover:text-[var(--color-button-bg-hover)]'
          }`}
        >
          Private
        </button>
        {/* Separator */}
        <span className="mx-2 text-[var(--color-input-bg)]">|</span>
        {/* Liked Tab */}
        <button
          role="tab"
          aria-selected={activeTab === 'liked'}
          onClick={() => setActiveTab('liked')}
          className={`px-4 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none ${
            activeTab === 'liked'
              ? 'text-[var(--color-button-bg)] border-b-2 border-[var(--color-button-bg)]'
              : 'text-[var(--color-text-secondary)] hover:text-[var(--color-button-bg-hover)]'
          }`}
        >
          Liked
        </button>
        {/* Separator */}
        <span className="mx-2 text-[var(--color-input-bg)]">|</span>
        {/* Shared Tab */}
        <button
          role="tab"
          aria-selected={activeTab === 'shared'}
          onClick={() => setActiveTab('shared')}
          className={`px-4 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none ${
            activeTab === 'shared'
              ? 'text-[var(--color-button-bg)] border-b-2 border-[var(--color-button-bg)]'
              : 'text-[var(--color-text-secondary)] hover:text-[var(--color-button-bg-hover)]'
          }`}
        >
          Shared
        </button>
      </div>

      {/* Pattern Content */}
      <PatternContent
        patterns={patterns}
        isLoading={isLoading}
        error={error}
        onSearch={performSearch}
        showPublicStatus={true} // maybe make this depend on active tab?
        searchProps={{
          title: titleSearchTerm,
          onTitleChange: setTitleSearchTerm,
          author: authorSearchTerm,
          onAuthorChange: setAuthorSearchTerm,
          sortOption: sortOption,
          onSortOptionChange: setSortOption,
          isAsc: isAsc,
          onSortDirectionToggle: () => setIsAsc(!isAsc),
          showAuthorSearch: activeTab !== 'private',
        }}
        pagination={{
          currentPage: currentPage,
          totalPages: totalPages,
          onPrevious: handlePrevious,
          onNext: handleNext,
        }}
      />
    </div>
  );
};

export default LibraryTabs;
