import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';

interface SearchBarProps {
  title: string;
  onTitleChange: (value: string) => void;
  author: string;
  onAuthorChange: (value: string) => void;
  sortOption: string;
  onSortOptionChange: (value: string) => void;
  isAsc: boolean;
  onSortDirectionToggle: () => void;
  onSearch: () => void;
  showAuthorSearch: boolean;
}

export default function SearchBar({
  title,
  onTitleChange,
  author,
  onAuthorChange,
  sortOption,
  onSortOptionChange,
  isAsc,
  onSortDirectionToggle,
  onSearch,
  showAuthorSearch,
}: SearchBarProps) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (event.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="bg-[var(--color-card-bg)] p-4 rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* Search by Title */}
        <input
          type="text"
          placeholder="Search by title..."
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 p-3 rounded-md border border-[var(--color-input-border)] bg-[var(--color-input-bg)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-button-bg)]"
        />

        {/* Conditionally render Search by Author */}
        {showAuthorSearch && (
          <input
            type="text"
            placeholder="Search by author..."
            value={author}
            onChange={(e) => onAuthorChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 p-3 rounded-md border border-[var(--color-input-border)] bg-[var(--color-input-bg)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-button-bg)]"
          />
        )}
      </div>

      <div className="flex items-center gap-4 mt-4">
        {/* Sort Dropdown */}
        <select
          value={sortOption}
          onChange={(e) => onSortOptionChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 p-3 rounded-md border border-[var(--color-input-border)] bg-[var(--color-input-bg)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-button-bg)]"
        >
          <option value="creationDate">Sort by Date</option>
          <option value="likeCount">Sort by Likes</option>
        </select>

        {/* Sort Direction Toggle */}
        <button
          onClick={onSortDirectionToggle}
          className="p-3 rounded-md border border-[var(--color-input-border)] bg-[var(--color-button-bg)] text-white flex items-center justify-center"
        >
          {isAsc ? <FaSortAmountUp /> : <FaSortAmountDown />}
        </button>

        {/* Search Button */}
        <button
          onClick={onSearch}
          className="px-6 py-3 rounded-md bg-[var(--color-button-bg)] text-white hover:bg-[var(--color-button-bg-hover)]"
        >
          Search
        </button>
      </div>
    </div>
  );
}
