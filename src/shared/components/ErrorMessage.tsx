import { AlertCircle } from 'lucide-react';
import { useTranslation } from '../hooks/use-translation';

interface ErrorMessageProps {
  error: {
    code: string;
    message: string;
  };
}

export function ErrorMessage({ error }: ErrorMessageProps) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center min-h-[400px] p-8">
      <div className="max-w-md w-full">
        <div className="rounded-lg p-8">
          <div className="flex flex-col items-center text-center space-y-4">
            {/* Error Icon */}
            <div className="rounded-full bg-red-100 dark:bg-red-900/30 p-4">
              <AlertCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-red-900 dark:text-red-100">{t('specialistGrid.noCandidatesFound')}</h3>

            {/* Description */}
            <p className="text-base text-red-800 dark:text-red-200">{t('specialistGrid.tryAdjustingSearch')}</p>

            {/* Error Details */}
            <div className="w-full mt-4 p-4 bg-red-100 dark:bg-red-900/40 rounded-md border border-red-300 dark:border-red-800">
              <p className="text-sm font-mono text-red-700 dark:text-red-300 break-all">
                <span className="font-semibold">{error.message}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
