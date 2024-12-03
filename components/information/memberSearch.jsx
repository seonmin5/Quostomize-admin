'use client'
import SearchBar from "../../components/button/searchBar";
import FilterButton from "../../components/button/filterButton";
import FilterConditions from "../../components/button/filterConditions";
import {useState} from "react";

// test
import DataTable from "../../components/table/dataTable";
import { LocalDateTime } from 'js-joda'; // 날짜 처리를 위한 패키지 임포트

const MemberSearchPage = () => {

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
                        <FilterConditions currentPage="members"/>
                    </div>
                )}
            </div>
            <DataTable columns={columns} data={data}/>
        </div>
    );
};

export default MemberSearchPage;