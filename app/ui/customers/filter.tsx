'use client';

import {
  ClockIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Filter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const createFiltersURL = (filters: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('filters', filters.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
      <div className="flex gap-4">
        <label
          htmlFor="pending"
          className="ml-2 flex  items-center gap-1.5 rounded-full  px-3 py-1.5 text-xs font-medium text-gray-700"
        >
          Filter
        </label>
        <div className="flex items-center">
          <Link href={createFiltersURL('all')}>
            <label
              htmlFor="all"
              className={`ml-2 flex cursor-pointer items-center gap-1.5 rounded-full ${
                searchParams.get('filters') === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100'
              }
              px-3 py-1.5 text-xs font-medium text-gray-600`}
            >
              All Customers <UserGroupIcon className="h-4 w-4" />
            </label>
          </Link>
        </div>
        <div className="flex items-center">
          <Link href={createFiltersURL('pending')}>
            <label
              htmlFor="pending"
              className={`ml-2 flex cursor-pointer items-center gap-1.5 rounded-full
              ${
                searchParams.get('filters') === 'pending'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100'
              }
              px-3 py-1.5 text-xs font-medium text-gray-600`}
            >
              Pending <ClockIcon className="h-4 w-4" />
            </label>
          </Link>
        </div>
        <div className="flex items-center">
          <Link href={createFiltersURL('paid')}>
            <label
              htmlFor="paid"
              className={`ml-2 flex cursor-pointer items-center gap-1.5 rounded-full ${
                searchParams.get('filters') === 'paid'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100'
              }
              px-3 py-1.5 text-xs font-medium text-gray-600`}
            >
              Paid <CurrencyDollarIcon className="h-4 w-4" />
            </label>
          </Link>
        </div>
      </div>
    </div>
  );
}
