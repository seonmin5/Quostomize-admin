'use client'
import SearchBar from "../../components/button/searchBar";
import FilterButton from "../../components/button/filterButton";
import FilterConditions from "../../components/button/filterConditions";
import { cardSearchColumn } from "../../components/column/cardSearchColumn"
import { cardInfo, cardInfoByFilter, cardInfoByKeyword } from "../apiMethodList/cardSearch/get"
import { useEffect, useState } from "react";


// test
import DataTable from "../table/cardDataTable";
import LoadingModal from "../modal/loadingModal";

const CardSearchPage = () => {
    const [cardInfos, setCardInfo] = useState([])
    const [filterDatas, setFilterData] = useState({})
    const [showFilter, setShowFilter] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(0);
    const param = new URLSearchParams()

    useEffect(() => {
        try {
            cardInfo(setCardInfo)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        filterDatas.page >= 0 ? cardInfoByFilter(setCardInfo, param, filterDatas) : null

    }, [filterDatas])

    // Columns 정의
    const columns = cardSearchColumn()

    const handleSearch = (query) => {
        const keywordDatas = {
            page: page,
            searchTerm: query
        }
        cardInfoByKeyword(setCardInfo, param, keywordDatas)
    };

    const toggleFilter = () => {
        setShowFilter((prev) => !prev);
    }

    return (
        <div>
            <div className="p-6">
                <div className="flex space-x-10 items-center justify-end">
                    <SearchBar onSearch={handleSearch} placeholder="카드번호를 입력해주세요" onClick={handleSearch} />
                    <FilterButton onClick={toggleFilter} />
                </div>
                {showFilter && (
                    <div className="absolute right-6 z-10">  {/* 필터 패널의 위치 조정 */}
                        <FilterConditions currentPage="cards" setFilterData={setFilterData} page={page} setPage={setPage} dataPage={cardInfos.totalPage} />
                    </div>
                )}
            </div>
            {isLoading && <LoadingModal message={"로딩 중입니다"} isOpen={isLoading} />}
            {<DataTable columns={columns} data={cardInfos.content} dataPage={cardInfos.totalPage} setFilterData={setFilterData} filterDatas={filterDatas} page={page} setPage={setPage} />}
        </div>
    );
};

export default CardSearchPage;