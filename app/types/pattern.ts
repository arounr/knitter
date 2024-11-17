export type Pattern = {
  id: string;
  title: string;
  isPublic: boolean;
  patternMatrix: Array<string>;
  colorCodes: Array<string>;
  creationDate: string; // ISO 8601 date string
  modificationDate: string; // ISO 8601 date string
  likeCount: number;
  imageUrl: string;
  ownerUsername: string;
};
