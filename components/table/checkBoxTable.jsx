import React, { useState } from 'react';
import { format, isValid, parseISO } from 'date-fns';

const CheckBoxTable = ({ columns, data, selectedRows, setSelectedRows, onApprove }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 20;

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = data.slice(startIndex, endIndex);

    const formatDate = (date) => {
        if (!date) return '';
        const parsedDate = typeof date === 'string' ? parseISO(date) : date;
        if (!isValid(parsedDate)) return date;
        return format(parsedDate, 'yyyy-MM-dd HH:mm:ss');
    };

    const formatBoolean = (value) => {
        return value ? 'Yes' : 'No';
    };

    const renderCellValue = (value, accessor) => {
        if (typeof value === 'boolean') {
            return formatBoolean(value);
        }
        if (value && typeof value === 'object' && ('_year' in value || '_date' in value)) {
            const dateString = value.toString();
            const parsedDate = parseISO(dateString);
            return isValid(parsedDate) ? format(parsedDate, 'yyyy-MM-dd HH:mm:ss') : dateString;
        }
        if (accessor.toLowerCase().includes('date') || accessor.toLowerCase().includes('at')) {
            return formatDate(value);
        }
        return value?.toString() || '';
    };

    const toggleRowSelection = (index) => {
        setSelectedRows((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    const toggleAllSelection = () => {
        if (selectedRows.length === currentData.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(currentData.map((_, index) => startIndex + index));
        }
    };

    return (
        <div className="w-full">
            <table className="min-w-full bg-white">
                <thead>
                <tr>
                    <th className="px-4 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        <input
                            type="checkbox"
                            checked={selectedRows.length === currentData.length && currentData.length > 0}
                            onChange={toggleAllSelection}
                        />
                    </th>
                    {columns.map((column) => (
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
                {currentData.map((row, rowIndex) => {
                    const globalIndex = startIndex + rowIndex;
                    return (
                        <tr
                            key={globalIndex}
                            className={
                                selectedRows.includes(globalIndex)
                                    ? 'bg-blue-100'
                                    : rowIndex % 2 === 0
                                        ? 'bg-white'
                                        : 'bg-gray-50'
                            }
                        >
                            <td className="px-4 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                <input
                                    type="checkbox"
                                    checked={selectedRows.includes(globalIndex)}
                                    onChange={() => toggleRowSelection(globalIndex)}
                                />
                            </td>
                            {columns.map((column) => (
                                <td
                                    key={`${globalIndex}-${column.accessor}`}
                                    className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500"
                                >
                                    {renderCellValue(row[column.accessor], column.accessor)}
                                </td>
                            ))}
                        </tr>
                    );
                })}
                </tbody>
            </table>

            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
                    disabled={currentPage === 0}
                    className="px-4 py-2 border rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-sm text-gray-700">
                    Page {currentPage + 1} of {totalPages}
                </span>
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))}
                    disabled={currentPage === totalPages - 1}
                    className="px-4 py-2 border rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default CheckBoxTable;