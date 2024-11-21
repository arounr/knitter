'use client';

import Form from 'next/form';
import { useState } from 'react';
import SubmitButton from '@/ui/submit-button';
import { ApiResponse } from '@/utils/apiUtils';
import { redirect } from 'next/navigation';

type SettingsDropdownProps = {
  changePassword: (
    formData: FormData,
  ) => Promise<ApiResponse<{ success: boolean }>>;
  changeUsername: (
    formData: FormData,
  ) => Promise<ApiResponse<{ success: boolean }>>;
  deleteAccount: () => Promise<ApiResponse<{ success: boolean }>>;
};

const SettingsDropdown: React.FC<SettingsDropdownProps> = ({
  changePassword,
  changeUsername,
  deleteAccount,
}) => {
  const [selectedOption, setSelectedOption] = useState<
    'password' | 'username' | 'delete'
  >('username');
  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form values for each option
  const [passwordValues, setPasswordValues] = useState({
    newPassword: '',
    confirmNewPassword: '',
  });

  const [usernameValue, setUsernameValue] = useState('');

  function handleOptionChange(option: 'password' | 'username' | 'delete') {
    setSelectedOption(option);
    setErrors([]); // Clear errors
    setSuccessMessage(null); // Clear success message
  }

  async function handleSubmit(
    formData: FormData,
    action: (formData: FormData) => Promise<ApiResponse<{ success: boolean }>>,
  ) {
    const result = await action(formData);
    if ('error' in result) {
      setErrors(Array.isArray(result.error) ? result.error : [result.error]);
      setSuccessMessage(null);
    } else {
      setErrors([]);
      setSuccessMessage('Operation completed successfully!');
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-center">Account Settings</h2>

      {/* Dropdown for selecting the action */}
      <div>
        <label
          htmlFor="settings-options"
          className="block mb-2 font-medium text-[var(--color-text-primary)]"
        >
          Select an action:
        </label>
        <select
          id="settings-options"
          value={selectedOption}
          onChange={(e) =>
            handleOptionChange(
              e.target.value as 'password' | 'username' | 'delete',
            )
          }
          className="w-full px-4 py-2 rounded-md bg-[var(--color-input-bg)] border border-gray-300 text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-button-bg)]"
        >
          <option value="username">Change Username</option>
          <option value="password">Change Password</option>
          <option value="delete">Delete Account</option>
        </select>
      </div>

      {/* Conditional rendering for forms */}
      {selectedOption === 'password' && (
        <Form
          action={(formData) => handleSubmit(formData, changePassword)}
          className="space-y-4"
        >
          <h3 className="text-lg font-medium text-[var(--color-text-primary)]">
            Change Password
          </h3>
          <div>
            <label htmlFor="new-password" className="block text-sm font-medium">
              New Password
            </label>
            <input
              id="new-password"
              name="newPassword"
              type="password"
              placeholder="Enter new password"
              value={passwordValues.newPassword}
              onChange={(e) =>
                setPasswordValues({
                  ...passwordValues,
                  newPassword: e.target.value,
                })
              }
              className="w-full px-4 py-2 rounded-md bg-[var(--color-input-bg)] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-button-bg)]"
              required
            />
          </div>
          <div>
            <label
              htmlFor="confirm-new-password"
              className="block text-sm font-medium"
            >
              Confirm New Password
            </label>
            <input
              id="confirm-new-password"
              name="confirmNewPassword"
              type="password"
              placeholder="Re-enter new password"
              value={passwordValues.confirmNewPassword}
              onChange={(e) =>
                setPasswordValues({
                  ...passwordValues,
                  confirmNewPassword: e.target.value,
                })
              }
              className="w-full px-4 py-2 rounded-md bg-[var(--color-input-bg)] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-button-bg)]"
              required
            />
          </div>
          {successMessage && (
            <div className="text-sm text-[var(--color-success)]">
              {successMessage}
            </div>
          )}
          {errors.length > 0 && (
            <div className="text-sm text-[var(--color-error)] space-y-1">
              {errors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
          <SubmitButton
            text="Update Password"
            loadingText="Updating Password..."
            className="w-full px-4 py-2 bg-[var(--color-button-bg)] hover:bg-[var(--color-button-bg-hover)] text-[var(--color-white-text)] font-medium rounded-md"
          />
        </Form>
      )}

      {selectedOption === 'username' && (
        <Form
          action={(formData) => handleSubmit(formData, changeUsername)}
          className="space-y-4"
        >
          <h3 className="text-lg font-medium text-[var(--color-text-primary)]">
            Change Username
          </h3>
          <div>
            <label htmlFor="new-username" className="block text-sm font-medium">
              New Username
            </label>
            <input
              id="new-username"
              name="newUsername"
              type="text"
              placeholder="Enter new username"
              value={usernameValue}
              onChange={(e) => setUsernameValue(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-[var(--color-input-bg)] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-button-bg)]"
              required
            />
          </div>
          {successMessage && (
            <div className="text-sm text-[var(--color-success)]">
              {successMessage}
            </div>
          )}
          {errors.length > 0 && (
            <div className="text-sm text-[var(--color-error)] space-y-1">
              {errors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
          <SubmitButton
            text="Update Username"
            loadingText="Updating Username..."
            className="w-full px-4 py-2 bg-[var(--color-button-bg)] hover:bg-[var(--color-button-bg-hover)] text-[var(--color-white-text)] font-medium rounded-md"
          />
        </Form>
      )}

      {selectedOption === 'delete' && (
        <Form
          action={() =>
            deleteAccount().then((result) => {
              if ('error' in result) {
                setErrors(
                  Array.isArray(result.error) ? result.error : [result.error],
                );
                setSuccessMessage(null);
              } else {
                setErrors([]);
                setSuccessMessage('Account deleted successfully!');
              }
            })
          }
          className="space-y-4"
        >
          <h3 className="text-lg font-medium text-[var(--color-error)]">
            Delete Account
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Deleting your account is permanent and cannot be undone. All your
            data will be lost.
          </p>
          {successMessage && (
            <div className="text-sm text-[var(--color-success)]">
              {successMessage}
            </div>
          )}
          {errors.length > 0 && (
            <div className="text-sm text-[var(--color-error)] space-y-1">
              {errors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
          <SubmitButton
            text="Delete My Account"
            loadingText="Deleting Account..."
            className="w-full px-4 py-2 bg-[var(--color-error)] hover:bg-red-600 text-[var(--color-white-text)] font-medium rounded-md"
          />
        </Form>
      )}
    </div>
  );
};

export default SettingsDropdown;
