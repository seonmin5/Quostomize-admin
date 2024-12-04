'use client'
import SearchBar from "../../components/button/searchBar";
import FilterButton from "../../components/button/filterButton";
import FilterConditions from "../../components/button/filterConditions";
import {useEffect, useState} from "react";
import CheckBoxTable from "../../components/table/checkBoxTable"
import SubmitButtonV2 from "../../components/button/submitButtonV2";

const MembersEditPage = () => {
    const [memberData, setMemberData] = useState([]);
    const [error, setError] = useState(null);

    const fetchMembers = async () => {
        try {
            const response = await fetch(`/api/members`, {
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
            setMemberData(data.data);
        } catch (error) {
            console.error('Error - 이용자 불러오기: ', error.message);
            setError(error.message);
        }
    }

    useEffect(() => {
        fetchMembers();
    }, []);

    const [showFilter, setShowFilter] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);

    const data = Array.isArray(memberData.content)
    ? memberData.content.map((item, index) => ({
            number: index + 1,
            memberId: item.memberId || '',
            memberName: item.memberName || '',
            memberEmail: item.memberEmail || '',
            memberLoginId: item.memberLoginId || '',
            zipCode: item.zipCode || '',
            memberAddress: item.memberAddress || '',
            memberDetailAddress: item.memberDetailAddress || '',
            role: item.role || '',
            createdAt: item.createdAt || '',
            modifiedAt: item.modifiedAt || '',
        }))
        : [];

    const columns = [
        {
            Header: 'No',
            accessor: 'number',
        },
        {
            Header: 'Member ID',
            accessor: 'memberId',
        },
        {
            Header: 'Member Name',
            accessor: 'memberName',
        },
        {
            Header: 'Member Email',
            accessor: 'memberEmail',
        },
        {
            Header: 'Member Login ID',
            accessor: 'memberLoginId',
        },
        {
            Header: 'Zip Code',
            accessor: 'zipCode',
        },
        {
            Header: 'Member Address',
            accessor: 'memberAddress',
        },
        {
            Header: 'Member Detail Address',
            accessor: 'memberDetailAddress',
        },
        {
            Header: 'Role',
            accessor: 'role',
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

    const handleSearch = (query) => {
        console.log(`검색어: ${query}`);
    };

    if (error) {
        return <div>에러가 발생했습니다: {error}</div>;
    }

    if (!memberData) {
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
                            사용자 정지
                        </SubmitButtonV2>
                    </div>
                    <div className="items-center flex space-x-10">
                        <SearchBar onSearch={handleSearch}/>
                        <FilterButton onClick={toggleFilter}/>
                    </div>
                </div>
                {showFilter && (
                    <div className="absolute right-6 z-10">
                        <FilterConditions currentPage="members"/>
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
};

export default MembersEditPage;