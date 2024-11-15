import type { Session } from 'next-auth';
import { useContext } from 'react';

import { SessionContext, type TSessionContextValue } from '@/components/SessionProvider';

export const useSession = () => {
  if (!SessionContext) {
    throw new Error('React Context is unavailable in Server Components');
  }

  const sessionContent: TSessionContextValue = useContext(SessionContext) || {
    data: null,
    status: 'unauthenticated',
    async update(): Promise<Session | null | undefined> {
      return undefined;
    },
  };

  if (!sessionContent && process.env.NODE_ENV !== 'production') {
    throw new Error('[auth-wrapper-error]: `useSessionData` must be wrapped in a <SessionDataProvider />');
  }

  return sessionContent;
};
