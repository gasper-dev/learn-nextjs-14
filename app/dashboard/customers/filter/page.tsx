import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import TableFilter from '@/app/ui/customers/table-filter';
import { lusitana } from '@/app/ui/fonts/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchCustomersPages } from '@/app/lib/data';
export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string; filters?: string };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const allCustomers = 'all';

  const filters = searchParams?.filters || allCustomers;

  const totalPages = await fetchCustomersPages(query);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Customers Filter</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search customers..." />
      </div>

      <Suspense
        key={query + currentPage + filters}
        fallback={<InvoicesTableSkeleton />}
      >
        <TableFilter query={query} currentPage={currentPage} filter={filters} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
