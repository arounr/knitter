export type ApiResponse<T> =
  | { data: T; code: number } // For successful responses
  | { error: string; code: number }; // For error responses

type Sort = {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
};

type Pageable = {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
};

export type PaginatedResponse<T> = {
  content: T[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const buildQueryString = (params: Record<string, any>): string => {
  return Object.entries(params)
    .filter(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_, value]) => value !== undefined && value !== null && value !== '',
    ) // Exclude undefined, null, and empty strings
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`, // Encode both key and value
    )
    .join('&');
};

export const getApiUrl = (): string | undefined => {
  return process.env.NEXT_PUBLIC_API_URL;
};

export const ServerError = new Error('Server Error');
