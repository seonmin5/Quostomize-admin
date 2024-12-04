'use client'
import SearchBar from "../../components/button/searchBar";
import FilterButton from "../../components/button/filterButton";
import PendingConditions from "../../components/button/pendingConditions";import {useState, useEffect} from "react";
import CheckBoxTable from "../../components/table/checkBoxTable"
import SubmitButtonV2 from "../../components/button/submitButtonV2";

const CreationPendingPage = () => {
    const [cardData, setCardData] = useState([]);
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
            applicantEmail: item.applicantEmail || '',
            applicantName: item.applicantName || '',
            englishName: item.englishName || '',
            homeAddress: item.homeAddress || '',
            homeDetailAddress: item.homeDetailAddress || '',
            phoneNumber: item.phoneNumber || '',
            residenceNumber: item.residenceNumber || '',
            shippingAddress: item.shippingAddress || '',
            shippingDetailAddress: item.shippingDetailAddress || '',
            zipCode: item.zipCode || '',
        }))
        : [];

    const columns = [
        {
            Header: 'No',  // 컬럼 제목을 "No"로 변경
            accessor: 'number',  // 넘버링을 표시할 컬럼으로 'number'를 사용
        },
        {
            Header: 'Applicant Email',
            accessor: 'applicantEmail',
        },
        {
            Header: 'Applicant Name',
            accessor: 'applicantName',
        },
        {
            Header: 'English Name',
            accessor: 'englishName',
        },
        {
            Header: 'Home Address',
            accessor: 'homeAddress',
        },
        {
            Header: 'Home Detail Address',
            accessor: 'homeDetailAddress',
        },
        {
            Header: 'Phone Number',
            accessor: 'phoneNumber',
        },
        {
            Header: 'Residence Number',
            accessor: 'residenceNumber',
        },
        {
            Header: 'Shipping Address',
            accessor: 'shippingAddress',
        },
        {
            Header: 'Shipping Detail Address',
            accessor: 'shippingDetailAddress',
        },
        {
            Header: 'Zip Code',
            accessor: 'zipCode',
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