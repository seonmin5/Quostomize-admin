'use client'
import SearchBar from "../button/searchBarV2";
import FilterButton from "../../components/button/filterButton";
import FilterConditions from "../button/filterConditionsV2";
import { cardSearchColumn } from "../../components/column/cardSearchColumn"
import { cardInfo, cardInfoByFilter, cardInfoByKeyword } from "../../service/apiMethodList/cardSearch/get"
import { useEffect, useState } from "react";
import DataTable from "../table/cardDataTable";
import SkeletonLoader from "../../components/spinner/skeletonLoader";

const CardSearchPage = () => {
    const [cardInfos, setCardInfo] = useState([])
    const [filterDatas, setFilterData] = useState({})
    const [showFilter, setShowFilter] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const param = new URLSearchParams()

    useEffect(() => {
        const fetchCardInfo = async () => {
            setIsLoading(true);
            try {
                await cardInfo(setCardInfo);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCardInfo();
    }, []);

    useEffect(() => {
        if (filterDatas.page >= 0) {
            const fetchFilteredData = async () => {
                setIsLoading(true);
                try {
                    await cardInfoByFilter(setCardInfo, param, filterDatas);
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
            await cardInfoByKeyword(setCardInfo, param, keywordDatas);
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
                    <SearchBar onSearch={handleSearch} placeholder="카드번호를 입력해주세요" onClick={handleSearch} />
                    <FilterButton onClick={toggleFilter} />
                </div>
                {showFilter && (
                    <div className="absolute right-6 z-10">
                        <FilterConditions currentPage="cards" setFilterData={setFilterData} page={page} setPage={setPage} dataPage={cardInfos.totalPage} />
                    </div>
                )}
            </div>
            {isLoading ? (
                <div className="p-6">
                    <SkeletonLoader />
                </div>
            ) : (
                <DataTable columns={cardSearchColumn()} data={cardInfos.content} dataPage={cardInfos.totalPage} setFilterData={setFilterData} filterDatas={filterDatas} page={page} setPage={setPage} />
                )}
        </div>
    );
};

export default CardSearchPage;