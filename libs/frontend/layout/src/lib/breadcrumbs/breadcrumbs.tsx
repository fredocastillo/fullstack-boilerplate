import { useLocation, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const location = useLocation();
  const pathname = location.pathname;

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (items) return items;

    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [{ label: 'Home', href: '/' }];

    segments.forEach((segment, index) => {
      const href = '/' + segments.slice(0, index + 1).join('/');
      const label = segment
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      breadcrumbs.push({ label, href });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <nav className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
      {breadcrumbs.map((item, index) => {
        const isLast = index === breadcrumbs.length - 1;
        return (
          <div key={item.href || item.label} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 mx-1 text-gray-400 dark:text-gray-600" />
            )}
            {item.href && !isLast ? (
              <Link
                to={item.href}
                className="hover:text-gray-800 dark:hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={
                  isLast ? 'text-gray-900 dark:text-white font-medium' : ''
                }
              >
                {item.label}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}

export default Breadcrumbs;
