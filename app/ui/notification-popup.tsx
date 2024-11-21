import { Notification } from '@/types/notification';

interface NotificationPopupProps {
  notifications: Notification[];
  onClose: () => void;
  onAccept: (id: number) => void; // Callback for Accept button
  onDecline: (id: number) => void; // Callback for Decline button
  onDismiss: (id: number) => void; // Callback for dismissing messages
}

const timeAgo = (timestamp: string): string => {
  const now = new Date();
  const notificationTime = new Date(timestamp);
  const elapsedMs = now.getTime() - notificationTime.getTime();

  const seconds = Math.floor(elapsedMs / 1000);
  if (seconds < 60) return `${seconds} seconds ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minutes ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;

  const days = Math.floor(hours / 24);
  return `${days} days ago`;
};

export default function NotificationPopup({
  notifications,
  onClose,
  onAccept,
  onDecline,
  onDismiss,
}: NotificationPopupProps) {
  const sortedNotifications = [...notifications].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );

  return (
    <div className="absolute top-12 right-4 bg-[var(--color-card-bg)] shadow-lg border border-[var(--color-text-secondary)] rounded-lg w-64 z-50">
      <div className="flex justify-between items-center p-2 border-b border-[var(--color-input-bg)]">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
          Notifications
        </h3>
        <button
          onClick={onClose}
          className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] focus:outline-none"
        >
          &times;
        </button>
      </div>
      <div className="max-h-64 overflow-y-auto">
        {sortedNotifications.length > 0 ? (
          sortedNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-2 border-b border-[var(--color-input-bg)] ${
                notification.type === 'MESSAGE'
                  ? 'hover:bg-[var(--color-input-bg)]'
                  : ''
              }`}
            >
              <p className="text-sm text-[var(--color-text-primary)]">
                {notification.message}
              </p>

              {notification.type === 'ACCEPT_DECLINE' &&
                notification.patternOwner && (
                  <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                    Invitation from:{' '}
                    <span className="font-semibold">
                      {notification.patternOwner}
                    </span>
                  </p>
                )}

              <p className="text-xs text-[var(--color-text-secondary)]">
                {timeAgo(notification.timestamp)}
              </p>

              {notification.type === 'ACCEPT_DECLINE' ? (
                <div className="flex space-x-2 mt-2">
                  <button
                    className="px-3 py-1 text-sm text-[var(--color-white-text)] bg-[var(--color-success)] rounded hover:bg-green-600"
                    onClick={() => onAccept(notification.id)}
                  >
                    Accept
                  </button>
                  <button
                    className="px-3 py-1 text-sm text-[var(--color-white-text)] bg-[var(--color-error)] rounded hover:bg-red-600"
                    onClick={() => onDecline(notification.id)}
                  >
                    Decline
                  </button>
                </div>
              ) : (
                <button
                  className="text-xs text-[var(--color-error)] hover:underline mt-2"
                  onClick={() => onDismiss(notification.id)}
                >
                  Dismiss
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="p-4 text-sm text-[var(--color-text-secondary)] text-center">
            No notifications
          </p>
        )}
      </div>
    </div>
  );
}
