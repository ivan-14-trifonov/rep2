import { BACKEND_URL, TOKEN } from '@/shared/config';
import { BaseClient } from './BaseClient';

export class BackendClient extends BaseClient {
  constructor() {
    super(`${BACKEND_URL}`, TOKEN);
  }
}
