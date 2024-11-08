export type Pattern = {
    id: number;
    title: string;
    isPublic: boolean;
    patternMatrix: string;
    creationDate: string; // ISO 8601 date string
    modificationDate: string; // ISO 8601 date string
    likeCount: number;
    imageUrl: string;
    ownerUsername: string;
  };
  