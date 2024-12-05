'use client'
import SearchBar from "../../components/button/searchBar";
import FilterButton from "../../components/button/filterButton";
import PendingConditions from "../../components/button/pendingConditions";
import {useEffect, useState} from "react";
import CheckBoxTable from "../../components/table/checkBoxTable"
import SubmitButtonV2 from "../../components/button/submitButtonV2";

const CancellationPendingPage = () => {
    const [cardData, setCardData] = useState([]);
    const [error, setError] = useState(null);

    const fetchCardData = async () => {
        try {
            const response = await fetch('api/cards/cancellationPending', {
                method: "GET",
                cache: "no-store",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message || `HTTP error! status: ${response.status}`);
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

    const [showFilter, setShowFilter] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);

    const data = Array.isArray(cardData.content)
        ? cardData.content.map((item, index) => ({
            number: index + 1,  // 넘버링 (1부터 시작)
            cardBrand: item.cardBrand || '',
            cardNumber: item.cardNumber || '',
            cardSequenceId: item.cardSequenceId || '',
            cardStatus: item.cardStatus || '',
            expirationDate: item.expirationDate || '',
            isAppCard: item.isAppCard || '',
            isForeignBlocked: item.isForeignBlocked || '',
            isPostpaidTransport: item.isPostpaidTransport || '',
            optionalTerms: item.optionalTerms || '',
            paymentReceiptMethods: item.paymentReceiptMethods || '',
            modifiedAt: item.modifiedAt || '',
            createdAt: item.createdAt || '',
        }))
        : [];

    const columns = [
        {
            Header: 'No',
            accessor: 'number',
        },
        {
            Header: 'Card Brand',
            accessor: 'cardBrand',
        },
        {
            Header: 'Card Number',
            accessor: 'cardNumber',
        },
        {
            Header: 'Card Sequence ID',
            accessor: 'cardSequenceId',
        },
        {
            Header: 'Card Status',
            accessor: 'cardStatus',
        },
        {
            Header: 'Expiration Date',
            accessor: 'expirationDate',
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
            Header: 'Optional Terms',
            accessor: 'optionalTerms',
        },
        {
            Header: 'Payment Receipt Methods',
            accessor: 'paymentReceiptMethods',
        },
        {
            Header: 'Modified At',
            accessor: 'modifiedAt',
        },
        {
            Header: 'Created At',
            accessor: 'createdAt',
        },
    ];


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
                            카드 정지
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
export default CancellationPendingPage;