import ErrorMessage from '@/ui/error-message';

import { User } from '@/types/user';
import { getProfile } from '@/(main)/profile/action';
import { Pattern } from '@/types/pattern';
import { getPatternById } from '../../[id]/action';
import { EditForm } from './editForm';

type PatternPageProps = {
  params: Promise<{ id: string }>;
};

const PatternPage = async ({ params }: PatternPageProps) => {
  const { id: patternId } = await params;

  // Fetch pattern data from the server
  const patternResult = await getPatternById(patternId);

  if ('error' in patternResult) {
    return (
      <div
        className={'flex-grow flex flex-col items-center justify-center w-full'}
      >
        <ErrorMessage
          headerTitle="Error Editing Pattern"
          message={'You are not authorized to edit this pattern.'}
        />
      </div>
    );
  }

  const patternData = patternResult.data as Pattern;

  const profileResult = await getProfile();

  // if logged in
  let profile;
  let isOwner;
  let isCollaborator;
  if ('data' in profileResult) {
    profile = profileResult.data as User;
    isOwner = profile.username === patternData.ownerUsername;
    isCollaborator = patternData.collaboratorNames.includes(profile.username);
  }

  if (!(isOwner || isCollaborator)) {
    return (
      <div
        className={'flex-grow flex flex-col items-center justify-center w-full'}
      >
        <ErrorMessage
          headerTitle="Error Editing Pattern"
          message={'You are not allowed to edit this pattern'}
        />
      </div>
    );
  }

  return (
    <div
      className={'flex-grow flex flex-col items-center justify-center w-full'}
    >
      <section className="w-full max-w-2xl text-center mb-4">
        <h1 className="text-3xl font-semibold text-[var(--color-text-primary)]">
          Edit Your Pattern
        </h1>
      </section>
      <div className="max-w-4xl mx-auto p-8 bg-[var(--color-card-bg)] shadow-lg rounded-lg">
        <EditForm
          pattern0={patternData.patternMatrix.map((stak) =>
            stak.split('').map((sstak) => Number(sstak)),
          )}
          color0={patternData.colorCodes}
          name0={patternData.title}
          isPublic0={patternData.isPublic}
          id={Number.parseInt(patternId)}
        />
      </div>
    </div>
  );
};

export default PatternPage;
