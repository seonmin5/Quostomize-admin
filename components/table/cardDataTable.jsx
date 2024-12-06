import React, { useState } from 'react';
import { format, isValid, parseISO } from 'date-fns';

const DataTable = ({ columns, data, dataPage, setFilterData, filterDatas, page, setPage }) => {

    const totalPages = Math.ceil(dataPage);

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

    return (
        <div className="max-w-full">
            <table className="min-w-[95%] bg-white">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.accessor} className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                {column.Header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data?.map((row, rowIndex) => (
                        <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            {columns.map((column) => (
                                <td key={`${rowIndex}-${column.accessor}`} className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                    {renderCellValue(row[column.accessor], column.accessor)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={() => {
                        setPage(prev => Math.max(0, prev - 1));
                        setFilterData(filterDatas.page >= 0
                            ? { page: Math.max(0, page - 1), sortDirection: filterDatas.sortDirection, status: filterDatas.status }
                            : { page: Math.max(0, page - 1), sortDirection: "DESC", status: "" })
                    }}
                    disabled={page === 0}
                    className="px-4 py-2 border rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                    이전
                </button>
                <span className="text-sm text-gray-700">
                    Page {page + 1} of {totalPages}
                </span>
                <button
                    onClick={() => {
                        setPage(prev => Math.min(totalPages - 1, prev + 1));
                        setFilterData(filterDatas.page >= 0
                            ? { page: Math.min(totalPages - 1, page + 1), sortDirection: filterDatas.sortDirection, status: filterDatas.status }
                            : { page: Math.min(totalPages - 1, page + 1), sortDirection: "DESC", status: "" })
                    }}
                    disabled={page === totalPages - 1}
                    className="px-4 py-2 border rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                    다음
                </button>
            </div>
        </div>
    );
};

export default DataTable;