import { getProfile, logout } from './action';
import ProfilePicture from '@/ui/profile-picture';
import ErrorMessage from '@/ui/error-message';
import ServerError from '@/ui/server-error-message';

const ProfilePage = async () => {
  const profile = await getProfile();

  if (/Invalid|expired/.test('error' in profile ? profile.error : '')) {
    // Token is invalid or expired
    return (
      <div
        className={'flex-grow flex flex-col items-center justify-center w-full'}
      >
        <ErrorMessage
          headerTitle="Session Expired"
          message="Your session has expired or is invalid. Please log in again."
          buttonTitle="Return to Login"
          clickAction={logout}
        />
      </div>
    );
  } else if ('error' in profile) {
    // Other error (likely server not open)
    return <ServerError />;
  }

  const { username, profilePicture } = profile.data;

  return (
    <div className={'flex-grow flex flex-col items-center w-full'}>
      <div className="w-full max-w-sm p-8 mt-8 space-y-6 bg-[var(--color-card-bg)] rounded-lg shadow-lg sm:p-12">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-semibold">Hello, {username}!</h1>
          <p className="text-[var(--color-text-secondary)] text-sm mt-1">
            Welcome to your profile settings.
          </p>
        </div>

        {/* Profile Picture Section */}
        <ProfilePicture profilePicture={profilePicture} />

        <div className="space-y-4">
          <h2 className="text-lg font-medium">Change Password</h2>
          <input
            type="password"
            placeholder="Current Password"
            className="w-full px-4 py-2 rounded-md bg-[var(--color-input-bg)] focus:outline-none focus:ring-2 focus:ring-[var(--color-button-bg)]"
          />
          <input
            type="password"
            placeholder="New Password"
            className="w-full px-4 py-2 rounded-md bg-[var(--color-input-bg)] focus:outline-none focus:ring-2 focus:ring-[var(--color-button-bg)]"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="w-full px-4 py-2 rounded-md bg-[var(--color-input-bg)] focus:outline-none focus:ring-2 focus:ring-[var(--color-button-bg)]"
          />
          <button className="w-full px-4 py-2 bg-[var(--color-button-bg)] hover:bg-[var(--color-button-bg-hover)] text-white font-medium rounded-md">
            Update Password
          </button>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-md"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
