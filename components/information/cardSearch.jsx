'use client'
import SearchBar from "../../components/button/searchBar";
import FilterButton from "../../components/button/filterButton";
import FilterConditions from "../../components/button/filterConditions";
import {useState} from "react";


// test
import DataTable from "../../components/table/dataTable";
import { LocalDate, LocalDateTime } from 'js-joda'; // 날짜 처리를 위한 패키지 임포트

const CardSearchPage = () => {

    // Dummy Data
    const data = [
        {
            cardSequenceId: 12345678,
            cardNumber: '1234-5678-9012-3456',
            cardBrand: 1,
            isAppCard: true,
            isForeignBlocked: false,
            isPostpaidTransport: true,
            expirationDate: LocalDate.parse('2025-12-31'),
            optionalTerms: 12,
            paymentReceiptMethods: 2,
            cardStatus: 'ACTIVE',
            createdAt: LocalDateTime.parse('2024-01-01T12:00:00'),
            modifiedAt: LocalDateTime.parse('2024-01-02T12:00:00'),
        },
        {
            cardSequenceId: 87654321,
            cardNumber: '9876-5432-1098-7654',
            cardBrand: 2,
            isAppCard: false,
            isForeignBlocked: true,
            isPostpaidTransport: false,
            expirationDate: LocalDate.parse('2026-06-30'),
            optionalTerms: 6,
            paymentReceiptMethods: 1,
            cardStatus: 'INACTIVE',
            createdAt: LocalDateTime.parse('2023-12-15T10:30:00'),
            modifiedAt: LocalDateTime.parse('2023-12-16T10:30:00'),
        }
    ];

    // Columns
    const columns = [
        {
            Header: 'Card Sequence ID',
            accessor: 'cardSequenceId',
        },
        {
            Header: 'Card Number',
            accessor: 'cardNumber',
        },
        {
            Header: 'Card Brand',
            accessor: 'cardBrand',
        },
        {
            Header: 'Is App Card',
            accessor: 'isAppCard',
        },
        {
            Header: 'Is Foreign Blocked',
            accessor: 'isForeignBlocked',
        },
        {
            Header: 'Is Postpaid Transport',
            accessor: 'isPostpaidTransport',
        },
        {
            Header: 'Expiration Date',
            accessor: 'expirationDate',
        },
        {
            Header: 'Optional Terms',
            accessor: 'optionalTerms',
        },
        {
            Header: 'Payment Receipt Methods',
            accessor: 'paymentReceiptMethods',
        },
        {
            Header: 'Card Status',
            accessor: 'cardStatus',
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
                        <FilterConditions currentPage="cards"/>
                    </div>
                )}
            </div>
            <DataTable columns={columns} data={data} />
        </div>
    );
};

export default CardSearchPage;