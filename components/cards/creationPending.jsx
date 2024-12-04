'use client'
import SearchBar from "../../components/button/searchBar";
import FilterButton from "../../components/button/filterButton";
import PendingConditions from "../../components/button/pendingConditions";
import {useState} from "react";

// test
import CheckBoxTable from "../../components/table/checkBoxTable"
import {LocalDate, LocalDateTime} from '@js-joda/core';
import SubmitButtonV2 from "../../components/button/submitButtonV2";


const CreationPendingPage = () => {
    const [cardData, setCardData] = useState(null);
    const [error, setError] = useState(null);

    const fetchCardData = async () => {
        try {
            const response = await fetch('api/cards/creationPending', {
                method: "GET",
                cache: "no-store",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setCardData(data.data);
        } catch (error) {
            console.error('Error - 카드 불러오기: ', error.message);
            setError(error.message);
        }
    }

    useEffect(() => {
        fetchCardData();
    }, []);

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
            cardStatus: 'CREATION_PENDING',
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
            cardStatus: 'CREATION_PENDING',
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
    const [selectedRows, setSelectedRows] = useState([]);

    const handleSearch = (query) => {
        console.log(`검색어: ${query}`);
    };

    if (error) {
        return <div>에러가 발생했습니다: {error}</div>;
    }

    if (!cardData) {
        return <div>로딩 중</div>;
    }

    const toggleFilter= () => {
        setShowFilter((prev) => !prev);
    }
    const handleApprove = () => {
        const approvedData = selectedRows.map((index) => data[index]);
        alert(`${approvedData.length}개의 행이 승인되었습니다.`);
        setSelectedRows([]);
    };

    return (
        <div>
            <div className="p-6">
                <div className="flex space-x-10 items-center justify-between">
                    <div>
                        <SubmitButtonV2 onClick={handleApprove} disabled={selectedRows.length === 0}>
                            신청 승인
                        </SubmitButtonV2>
                    </div>
                    <div className="items-center flex space-x-10">
                        <SearchBar onSearch={handleSearch}/>
                        <FilterButton onClick={toggleFilter}/>
                    </div>
                </div>
                {showFilter && (
                    <div className="absolute right-6 z-10">
                        <PendingConditions />
                    </div>
                )}
            </div>
            <CheckBoxTable
                columns={columns}
                data={data}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
            />
        </div>
    );


}
export default CreationPendingPage;