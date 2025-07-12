import { Shield } from 'lucide-react';

export function Banner() {
  return (
    <div className="border-b px-6 py-1.5 bg-yellow-100/60 text-yellow-900 border-yellow-300 dark:bg-yellow-900/20 dark:border-yellow-800/30 dark:text-gray-300">
      <div className="container mx-auto flex items-center justify-center">
        <div className="flex items-center space-x-2 text-center">
          <Shield className="h-4 w-4 text-yellow-700 dark:text-yellow-400" />
          <p className="text-xs leading-snug">
            <span className="font-medium text-yellow-800 dark:text-yellow-400">
              Data Sensitivity:{' '}
            </span>
            This system may contain CONFIDENTIAL and INTERNAL USE data. Ensure
            proper handling according to company data governance policies.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Banner;
