'use client'
import SearchBar from "../../components/button/searchBar";
import FilterButton from "../../components/button/filterButton";
import FilterConditions from "../../components/button/filterConditions";
import { memberSearchColumn } from "../column/memberSearchColumn";
import { memberInfo, memberInfoByFilter, memberInfoByKeyword } from "../../components/apiMethodList/memberSearch/get"
import { useEffect, useState } from "react";

// test
import DataTable from "../table/memberDataTable";
import LoadingModal from "../modal/loadingModal";

const MemberSearchPage = () => {
    const [memberInfos, setMemberInfo] = useState([])
    const [filterDatas, setFilterData] = useState({})
    const [showFilter, setShowFilter] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(0);
    const param = new URLSearchParams()

    useEffect(() => {
        try {
            memberInfo(setMemberInfo)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        filterDatas.page >= 0 ? memberInfoByFilter(setMemberInfo, param, filterDatas) : null
    }, [filterDatas])

    // Columns
    const columns = memberSearchColumn()

    const handleSearch = (query) => {
        const keywordDatas = {
            page: page,
            searchTerm: query
        }
        memberInfoByKeyword(setMemberInfo, param, keywordDatas)
    };

    const toggleFilter = () => {
        setShowFilter((prev) => !prev);
    }

    return (
        <div>
            <div className="p-6">
                <div className="flex space-x-10 items-center justify-end">
                    <SearchBar onSearch={handleSearch} placeholder="이용자 아이디를 입력해주세요" onClick={handleSearch} />
                    <FilterButton onClick={toggleFilter} />
                </div>
                {showFilter && (
                    <div className="absolute right-6 z-10">  {/* 필터 패널의 위치 조정 */}
                        <FilterConditions currentPage="members" setFilterData={setFilterData} page={page} setPage={setPage} dataPage={memberInfos.totalPage} />
                    </div>
                )}
            </div>
            {isLoading && <LoadingModal message={"로딩 중입니다"} isOpen={isLoading} />}
            <DataTable columns={columns} data={memberInfos.content} dataPage={memberInfos.totalPage} setFilterData={setFilterData} filterDatas={filterDatas} page={page} setPage={setPage} />
        </div>
    );
};

export default MemberSearchPage;