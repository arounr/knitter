export type Notification = {
  id: number;
  message: string;
  type: 'ACCEPT_DECLINE' | 'MESSAGE';
  timestamp: string; // ISO 8601 format
  patternOwner: string;
};
