'use client'
import SearchBar from "../button/searchBarV2";
import FilterButton from "../../components/button/filterButton";
import FilterConditions from "../button/filterConditionsV2";
import { memberSearchColumn } from "../column/memberSearchColumn";
import { memberInfo, memberInfoByFilter, memberInfoByKeyword } from "../../service/apiMethodList/memberSearch/get"
import { useEffect, useState } from "react";
import DataTable from "../table/memberDataTable";
import SkeletonLoader from "../../components/spinner/skeletonLoader";

const MemberSearchPage = () => {
    const [memberInfos, setMemberInfo] = useState([])
    const [filterDatas, setFilterData] = useState({})
    const [showFilter, setShowFilter] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const param = new URLSearchParams()

    useEffect(() => {
        const fetchMemberInfo = async () => {
            setIsLoading(true);
            try {
                await memberInfo(setMemberInfo);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMemberInfo();
    }, []);


    useEffect(() => {
        if (filterDatas.page >= 0) {
            const fetchFilteredData = async () => {
                setIsLoading(true);
                try {
                    await memberInfoByFilter(setMemberInfo, param, filterDatas);
                } catch (error) {
                    console.error(error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchFilteredData();
        }
    }, [filterDatas]);

    const handleSearch = async (query) => {
        setIsLoading(true);
        const keywordDatas = {
            page: page,
            searchTerm: query,
        };
        try {
            await memberInfoByKeyword(setMemberInfo, param, keywordDatas);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
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
            {isLoading ? (
                <div className="p-6">
                    <SkeletonLoader />
                </div>
            ) : (
                <DataTable columns={memberSearchColumn()} data={memberInfos.content} dataPage={memberInfos.totalPage} setFilterData={setFilterData} filterDatas={filterDatas} page={page} setPage={setPage} />
                )}
        </div>
    );
};

export default MemberSearchPage;