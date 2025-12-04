"use client";

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-center mt-6 gap-2 text-sm">
      {/* 이전 버튼 */}
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="px-3 py-1 border rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 transition"
      >
        이전
      </button>

      {/* 페이지 번호 */}
      <span className="px-4 py-1 text-gray-700">
        {page} / {totalPages}
      </span>

      {/* 다음 버튼 */}
      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="px-3 py-1 border rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 transition"
      >
        다음
      </button>
    </div>
  );
}
