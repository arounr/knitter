import {
  changePassword,
  changeUsername,
  deleteUser,
  getProfile,
  logout,
} from './action';
import ProfilePicture from '@/ui/profile-picture';
import ErrorMessage from '@/ui/error-message';
import ServerError from '@/ui/server-error-message';
import SettingsDropdown from '@/component/settings-dropdown';

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
    return (
      <div
        className={'flex-grow flex flex-col items-center justify-center w-full'}
      >
        <ServerError />
      </div>
    );
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

        <SettingsDropdown
          changeUsername={changeUsername}
          changePassword={changePassword}
          deleteAccount={deleteUser}
        />

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
