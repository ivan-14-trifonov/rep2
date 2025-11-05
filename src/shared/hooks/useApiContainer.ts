import { useSession } from 'next-auth/react';
import { ApiContainer } from '../api/ApiContainer';

export function useApiContainer() {
  const { data: session } = useSession();
  const accessToken = session?.accessToken; // Предполагая, что токен доступа находится здесь

  return new ApiContainer(accessToken || '');
}
