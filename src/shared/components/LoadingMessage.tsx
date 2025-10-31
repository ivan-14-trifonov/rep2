import { Loader2 } from 'lucide-react';
import { useTranslation } from '../hooks/use-translation';

export function LoadingMessage({ message }: { message?: string }) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center min-h-[400px] p-8">
      <div className="max-w-md w-full">
        <div className=" rounded-lg p-8">
          <div className="flex flex-col items-center text-center space-y-4">
            {/* Loading Icon */}
            <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-4">
              <Loader2 className="h-12 w-12 text-blue-600 dark:text-blue-400 animate-spin" />
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100">{t('common.loading') || 'Loading...'}</h3>

            {/* Description */}
            <p className="text-base text-blue-800 dark:text-blue-200">{message || 'Please wait while we load the data'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
