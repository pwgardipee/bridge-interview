import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid';

export default function Pagination({ numberOfPages, currentPage, onPageChange }: { numberOfPages: number, currentPage: number, onPageChange: (page: number) => void }) {
  const handlePageClick = (page: number) => {
    if (page >= 0 && page < numberOfPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const pageButton = (pageNum: number) => (
    <button
      key={pageNum}
      onClick={() => handlePageClick(pageNum - 1)}
      className={`inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium ${
        pageNum === currentPage + 1
          ? 'border-indigo-500 text-indigo-600'
          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
      }`}
    >
      {pageNum}
    </button>
  );

  const ellipsis = (key: string) => (
    <span
      key={key}
      className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500"
    >
      ...
    </span>
  );

  const renderPageNumbers = () => {
    const pages = [];
    
    // For small number of pages, show all
    if (numberOfPages <= 7) {
      return Array.from({length: numberOfPages}, (_, i) => pageButton(i + 1));
    }

    // Show first page and ellipsis if needed
    if (currentPage > 3) {
      pages.push(pageButton(1), ellipsis('start'));
    }

    // Show pages around current page
    for (let i = Math.max(1, currentPage - 2); i <= Math.min(numberOfPages, currentPage + 4); i++) {
      pages.push(pageButton(i));
    }

    // Show last page and ellipsis if needed
    if (currentPage < numberOfPages - 4) {
      pages.push(ellipsis('end'), pageButton(numberOfPages));
    }

    return pages;
  };

  const navButtonClass = "inline-flex items-center border-t-2 border-transparent pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
      <div className="-mt-px flex w-0 flex-1">
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 0}
          className={`${navButtonClass} pr-1`}
        >
          <ArrowLongLeftIcon aria-hidden="true" className="mr-3 h-5 w-5 text-gray-400" />
          Previous
        </button>
      </div>
      <div className="hidden md:-mt-px md:flex">{renderPageNumbers()}</div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
        <button
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === numberOfPages - 1}
          className={`${navButtonClass} pl-1`}
        >
          Next
          <ArrowLongRightIcon aria-hidden="true" className="ml-3 h-5 w-5 text-gray-400" />
        </button>
      </div>
    </nav>
  );
}
