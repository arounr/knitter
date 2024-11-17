export type User = {
  id: string; // User's unique identifier
  username: string; // Username of the user
  likedPatternIds: number[]; // Array of IDs representing liked patterns
  profilePicture: string | null; // URL or null if no profile picture is set
  joinDate: string; // ISO string representing the date the user joined
};
