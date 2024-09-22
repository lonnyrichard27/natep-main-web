import React from 'react';

interface PaginationProps {
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  noOfCurrentPageRecords: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalRecords,
  totalPages,
  currentPage,
  noOfCurrentPageRecords,
  onPageChange,
}) => {
  const handlePageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPage = parseInt(event.target.value, 10);
    onPageChange(selectedPage);
  };

  return (
    <section className="flex justify-between">
      <div className="flex items-center mt-4">
        <p>Page</p>
        <select
          value={currentPage}
          onChange={handlePageChange}
          className="mx-2 p-1 border rounded"
        >
          {Array.from({ length: totalPages }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        <p>of</p>
        <p className="ml-2">{totalPages}</p>
      </div>

      <div className="flex items-center mt-4 text-[#525A6E]">
        <p>Showing</p>
        <p className="ml-1">{noOfCurrentPageRecords}</p>
        <p className="mx-2">of</p>
        <p>{totalRecords}</p>
      </div>
    </section>
  );
};

export default Pagination;