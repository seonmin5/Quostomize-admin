import React, { useState } from 'react';
import { format, parseISO, isValid } from 'date-fns';

const CheckBoxTableV3 = ({
                             columns,
                             data = [],
                             selectedRows,
                             setSelectedRows,
                             page = 0,
                             setPage
                         }) => {
    const itemsPerPage = 20;
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = page * itemsPerPage;
    const [filterData, setFilterData] = useState({ page: 0 });

    const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

    const formatDate = (date) => {
        if (!date) return '';
        const parsedDate = typeof date === 'string' ? parseISO(date) : date;
        return isValid(parsedDate) ? format(parsedDate, 'yyyy-MM-dd HH:mm:ss') : date;
    };

    const renderCellValue = (value, accessor) => {
        if (typeof value === 'boolean') return value ? 'Yes' : 'No';
        if (accessor.toLowerCase().includes('date') || accessor.toLowerCase().includes('at')) {
            return formatDate(value);
        }
        return value?.toString() || '';
    };

    const toggleRowSelection = (index) => {
        const actualIndex = startIndex + index;
        setSelectedRows(prev =>
            prev.includes(actualIndex)
                ? prev.filter(i => i !== actualIndex)
                : [...prev, actualIndex]
        );
    };

    const toggleAllSelection = () => {
        const currentPageIndices = paginatedData.map((_, index) => startIndex + index);
        setSelectedRows(prev =>
            prev.length === currentPageIndices.length ? [] : currentPageIndices
        );
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
        setFilterData(prev => ({ ...prev, page: newPage }));
        setSelectedRows([]);
    };

    if (!data) return <div>데이터 불러오는 중...</div>;

    return (
        <div className="max-w-full">
            <table className="min-w-[95%] bg-white">
                <thead>
                <tr>
                    <th className="px-4 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        <input
                            type="checkbox"
                            checked={selectedRows.length === paginatedData.length && paginatedData.length > 0}
                            onChange={toggleAllSelection}
                        />
                    </th>
                    {columns.map(column => (
                        <th
                            key={column.accessor}
                            className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                        >
                            {column.Header}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {paginatedData.map((row, index) => (
                    <tr
                        key={index}
                        className={
                            selectedRows.includes(startIndex + index)
                                ? 'bg-blue-100'
                                : index % 2 === 0
                                    ? 'bg-white'
                                    : 'bg-gray-50'
                        }
                    >
                        <td className="px-4 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                            <input
                                type="checkbox"
                                checked={selectedRows.includes(startIndex + index)}
                                onChange={() => toggleRowSelection(index)}
                            />
                        </td>
                        {columns.map(column => (
                            <td
                                key={`${index}-${column.accessor}`}
                                className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500"
                            >
                                {renderCellValue(row[column.accessor], column.accessor)}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={() => handlePageChange(Math.max(0, page - 1))}
                    disabled={page === 0}
                    className="px-4 py-2 border rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                    이전
                </button>
                <span className="text-sm text-gray-700">
                    Page {page + 1} of {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(Math.min(totalPages - 1, page + 1))}
                    disabled={page === totalPages - 1}
                    className="px-4 py-2 border rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                    다음
                </button>
            </div>
        </div>
    );
};

export default CheckBoxTableV3;