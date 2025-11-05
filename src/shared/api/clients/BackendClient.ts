import { BACKEND_URL } from '@/shared/config';
import { BaseClient } from './BaseClient';
import { auth } from '@/auth';
import { getSession } from 'next-auth/react';

export class BackendClient extends BaseClient {
  constructor(token: string) {
    super(`${BACKEND_URL}`, token);
  }
}
