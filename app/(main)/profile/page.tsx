import { getProfile } from './action';
import { logout } from './action';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const profile = await getProfile();

  if (profile.error) {
    redirect('/');
  }

  const { username } = profile;

  return (
    <div className="w-full max-w-sm p-8 mt-8 space-y-6 bg-[var(--color-card-bg)] rounded-lg shadow-lg sm:p-12">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-semibold">Hello, {username}!</h1>
        <p className="text-[var(--color-text-secondary)] text-sm mt-1">
          Welcome to your profile settings.
        </p>
      </div>

      {/* Profile Picture Section */}
      {/* <div className="flex flex-col items-center space-y-4">
        <img
          src="null" // Replace with actual profile picture URL if available
          alt="Profile Picture"
          width={96}
          height={96}
          className="rounded-full object-cover bg-gray-200"
        />
        <button className="px-4 py-2 bg-[var(--color-button-bg)] hover:bg-[var(--color-button-bg-hover)] text-white rounded-md">
          Change Profile Picture
        </button>
      </div> */}

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
  );
}
