'use client'
import SearchBar from "../../components/button/searchBar";
import FilterButton from "../../components/button/filterButton";
import FilterConditions from "../../components/button/filterConditions";
import {useState} from "react";

// test
import DataTable from "../../components/table/dataTable";
import { LocalDateTime } from '@js-joda/core';

const PaymentRecordsSearch = () => {

    // Dummy data
    const data = [
        {
            paymentRecordId: 1001,
            industryType: 1,
            businessRegistrationNumber: '123-45-67890',
            totalPaymentAmount: 500000,
            cardSequenceId: 12345678,
            createdAt: LocalDateTime.parse('2024-01-01T12:00:00'),
            modifiedAt: LocalDateTime.parse('2024-01-02T12:00:00'),
        },
        {
            paymentRecordId: 1002,
            industryType: 2,
            businessRegistrationNumber: '987-65-43210',
            totalPaymentAmount: 300000,
            cardSequenceId: 87654321,
            createdAt: LocalDateTime.parse('2024-01-05T10:30:00'),
            modifiedAt: LocalDateTime.parse('2024-01-06T10:30:00'),
        },
        {
            paymentRecordId: 1003,
            industryType: 3,
            businessRegistrationNumber: '135-79-24680',
            totalPaymentAmount: 1200000,
            cardSequenceId: 11223344,
            createdAt: LocalDateTime.parse('2023-12-20T09:00:00'),
            modifiedAt: LocalDateTime.parse('2023-12-21T09:30:00'),
        }
    ];

    // Columns
    const columns = [
        {
            Header: 'Payment Record ID',
            accessor: 'paymentRecordId',
        },
        {
            Header: 'Industry Type',
            accessor: 'industryType',
        },
        {
            Header: 'Business Registration Number',
            accessor: 'businessRegistrationNumber',
        },
        {
            Header: 'Total Payment Amount',
            accessor: 'totalPaymentAmount',
        },
        {
            Header: 'Card Sequence ID',
            accessor: 'cardSequenceId',
        },
        {
            Header: 'Created At',
            accessor: 'createdAt',
        },
        {
            Header: 'Modified At',
            accessor: 'modifiedAt',
        },
    ];

    const [showFilter, setShowFilter] = useState(false);
    const handleSearch = (query) => {
        console.log(`검색어: ${query}`);
    };
    const toggleFilter= () => {
        setShowFilter((prev) => !prev);
    }

    return (
        <div>
            <div className="p-6">
                <div className="flex space-x-10 items-center justify-end">
                    <SearchBar onSearch={handleSearch}/>
                    <FilterButton onClick={toggleFilter}/>
                </div>
                {showFilter && (
                    <div className="absolute right-6 z-10">  {/* 필터 패널의 위치 조정 */}
                        <FilterConditions currentPage="payments"/>
                    </div>
                )}
            </div>
            <DataTable columns={columns} data={data}/>
        </div>
    );
};

export default PaymentRecordsSearch;