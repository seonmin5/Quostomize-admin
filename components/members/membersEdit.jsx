'use client'
import SearchBar from "../../components/button/searchBar";
import FilterButton from "../../components/button/filterButton";
import FilterConditions from "../../components/button/filterConditions";
import { useEffect, useState } from "react";
import CheckBoxTable from "../../components/table/checkBoxTable"
import SubmitButtonV2 from "../../components/button/submitButtonV2";
import { useSession } from "next-auth/react";

const MembersEditPage = () => {
    const [memberData, setMemberData] = useState([]);
    const [filterDatas, setFilterData] = useState([])
    const [error, setError] = useState(null);
    const [showFilter, setShowFilter] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [page, setPage] = useState(0);
    const param = new URLSearchParams()
    const { data: session } = useSession()

    useEffect(() => {
        fetchMembers(setMemberData, setError);
    }, []);

    useEffect(() => {
        filterDatas.page >= 0 ? fetchMembersByFilter(setMemberData, param, filterDatas, setError) : null
    }, [filterDatas])


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
        const keyword =
        {
            page: page,
            searchTerm: query
        }

        fetchMembersBykeyword(setMemberData, param, keyword, setError)
        console.log(`검색어: ${query}`);
    };

    if (error) {
        return <div>에러가 발생했습니다: {error}</div>;
    }

    if (!memberData) {
        return <div>로딩 중</div>;
    }

    const toggleFilter = () => {
        setShowFilter((prev) => !prev);
    }
    const handleApprove = () => {
        alert(`${selectedRows.length}개의 행이 승인되었습니다.`);
        let keywordList = []
        selectedRows.map((row) => {
            memberData.content.map((data, index) => {
                if (row === index) {
                    keywordList.push({
                        adminId: session.memberId,
                        memberId: data.memberId,
                        role: "SUSPENDED_MEMBER",
                        secondaryAuthCode: 123456
                    })
                }
            })
        })
        console.log(keywordList)
        keywordList.map((data) => {
            PatchMemberRole(data, setError)
        })
        setTimeout(() => {
            fetchMembers(setMemberData, setError);
        }, 500);
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
                        <SearchBar onSearch={handleSearch} />
                        <FilterButton onClick={toggleFilter} />
                    </div>
                </div>
                {showFilter && (
                    <div className="absolute right-6 z-10">
                        <FilterConditions currentPage="members" setFilterData={setFilterData} page={page} setPage={setPage} totalPage={memberData.totalPage} />
                    </div>
                )}
            </div>
            <CheckBoxTable
                columns={columns}
                data={memberData.content}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                totalPage={memberData.totalPage}
                filterDatas={filterDatas}
                setFilterData={setFilterData}
                page={page}
                setPage={setPage}
            />
        </div>
    );
};

async function fetchMembers(setMemberData, setError) {
    try {
        const response = await fetch(`/api/members/searchMember`, {
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

async function fetchMembersByFilter(setMemberData, param, filterDatas, setError) {
    param.append("page", filterDatas.page)
    param.append("sortDirection", filterDatas.sortDirection)
    param.append("memberRole", filterDatas.memberRole)
    try {
        const response = await fetch(`/api/members/searchMemberByFilter?${param}`, {
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

async function fetchMembersBykeyword(setMemberData, param, filterDatas, setError) {
    param.append("page", filterDatas.page)
    param.append("searchTerm", filterDatas.searchTerm)
    try {
        const response = await fetch(`/api/members/searchMemberByKeyword?${param}`, {
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


async function PatchMemberRole(filterDatas, setError) {

    try {
        const response = await fetch(`/api/members/memberRoleChange`, {
            method: "PATCH",
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                adminId: filterDatas.adminId,
                memberId: filterDatas.memberId,
                role: filterDatas.role,
                secondaryAuthCode: filterDatas.secondaryAuthCode
            })
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message || `HTTP error! status: ${response.status}`);
        }

    } catch (error) {
        console.error('Error - 이용자 불러오기: ', error.message);
        setError(error.message);
    }
}

export default MembersEditPage;