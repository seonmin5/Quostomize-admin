'use client'
import SearchBar from "../../components/button/searchBar";
import FilterButton from "../../components/button/filterButton";
import FilterConditions from "../../components/button/filterConditions";
import {useState} from "react";

// test
import CheckBoxTable from "../../components/table/checkBoxTable"
import { LocalDateTime } from 'js-joda';
import SubmitButtonV2 from "../../components/button/submitButtonV2";

const MembersEditPage = () => {
    // Dummy Data
    const data = [
        {
            memberId: 1,
            memberName: 'John Doe',
            memberEmail: 'johndoe@example.com',
            memberLoginId: 'john123',
            zipCode: '12345',
            memberAddress: '123 Main St',
            memberDetailAddress: 'Apt 4B',
            role: 'MEMBER',
            createdAt: LocalDateTime.parse('2024-01-01T12:00:00'),
            modifiedAt: LocalDateTime.parse('2024-01-02T12:00:00'),
        },
        {
            memberId: 2,
            memberName: 'Jane Smith',
            memberEmail: 'janesmith@example.com',
            memberLoginId: 'jane456',
            zipCode: '67890',
            memberAddress: '456 Oak Ave',
            memberDetailAddress: 'Suite 101',
            role: 'MEMBER',
            createdAt: LocalDateTime.parse('2023-12-15T10:30:00'),
            modifiedAt: LocalDateTime.parse('2023-12-16T10:30:00'),
        },
        {
            memberId: 3,
            memberName: 'Mark Lee',
            memberEmail: 'marklee@example.com',
            memberLoginId: 'mark789',
            zipCode: '54321',
            memberAddress: '789 Pine St',
            memberDetailAddress: 'Room 202',
            role: 'SUSPENDED_MEMBER',
            createdAt: LocalDateTime.parse('2023-11-20T15:00:00'),
            modifiedAt: LocalDateTime.parse('2023-11-21T15:00:00'),
        },
        {
            memberId: 4,
            memberName: 'Lucy Kim',
            memberEmail: 'lucykim@example.com',
            memberLoginId: 'lucy101',
            zipCode: '11223',
            memberAddress: '101 Maple Rd',
            memberDetailAddress: 'Unit 5A',
            role: 'OLD_MEMBER',
            createdAt: LocalDateTime.parse('2022-06-30T08:00:00'),
            modifiedAt: LocalDateTime.parse('2023-01-10T08:30:00'),
        }
    ];

    // Columns
    const columns = [
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

    const [showFilter, setShowFilter] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);

    const handleSearch = (query) => {
        console.log(`검색어: ${query}`);
    };

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