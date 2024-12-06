'use client'

import {useEffect, useState} from "react";
import {loginSearchColumn} from "../../components/column/loginSearchColumn";
import FilterButton from "../../components/button/filterButton";
import FilterConditions from "../../components/button/filterConditionByLoginLog";
import DataTable from "../../components/table/loginDataTable";
import {NotiInfo, NotiInfoByFilter} from "../../service/notiSearch/get";
import SkeletonLoader from "@/components/spinner/skeletonLoader";

const NotiSearchPage = () => {
    const [notiInfo, setNotiInfo] = useState(
        {
            content: [],
            currentPage: 0,
            totalPage: 1
        });
    const [isLoading, setIsLoading] = useState(true);
    const [filterData, setFilterData] = useState({})
    const [showFilter, setShowFilter] = useState(false);
    const [page, setPage] = useState(0);
    const [error, setError] = useState(null);
    const param = new URLSearchParams()

    const getNotiInfo = async () => {
        setIsLoading(true);
        try {
            const response = await NotiInfo();
            setNotiInfo(response);
        } catch (error) {
            setError("데이터를 불러오는 중 문제가 발생했습니다.");
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getNotiInfo();
    }, [])

    useEffect(() => {
        if (filterData.page >= 0) {
            const fetchFilteredData = async () => {
                try {
                    const response = await NotiInfoByFilter(setNotiInfo, param, filterData);
                    setNotiInfo(response);
                } catch (err) {
                    console.error("Error fetching filtered data:", err);
                }
            };
            fetchFilteredData();
        }
    }, [filterData]);

    const toggleFilter = () => {
        setShowFilter(prev => !prev);
    }

    if (error) {
        return <div>{error}</div>;
    }

    console.log(notiInfo);

    return (
        <div>
            <div className="p-6">
                <div className="flex space-x-10 items-center justify-end">
                    <FilterButton onClick={toggleFilter}/>
                </div>
                {showFilter && (
                    <div className="absolute right-6 z-10">
                        <FilterConditions
                            currentPage="notilog"
                            setFilterData={setFilterData}
                            page={page}
                            setPage={setPage}
                            dataPage={notiInfo.totalPages}/>
                    </div>
                )}
            </div>
            {isLoading ? (
                <div className="p-6">
                    <SkeletonLoader />
                </div>
            ) : (
            <DataTable
                columns={loginSearchColumn()}
                data={notiInfo.content}
                dataPage={notiInfo.totalPages}
                setFilterData={setFilterData}
                filterDatas={filterData}
                page={page}
                setPage={setPage}/>)}
        </div>
    );
}

export default NotiSearchPage;