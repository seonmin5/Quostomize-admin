'use client'

import FilterButton from "../../components/button/filterButton";
import FilterConditions from "../../components/button/filterConditionByLoginLog";
import { loginSearchColumn } from "../../components/column/loginSearchColumn"
import { loginInfo, loginInfoByFilter } from "../../service/apiMethodList/loginSearch/get"
import { useEffect, useState } from "react";
import DataTable from "../table/loginDataTable";
import SkeletonLoader from "../../components/spinner/skeletonLoader";

const LoginSearchPage = () => {
    const [loginInfos, setLoginInfos] = useState([])
    const [filterDatas, setFilterData] = useState({})
    const [showFilter, setShowFilter] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const param = new URLSearchParams()

    useEffect(() => {
        const fetchLogInfo = async () => {
            setIsLoading(true);
            try {
                await loginInfo(setLoginInfos);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchLogInfo();
    }, []);

    useEffect(() => {
        if (filterDatas.page >= 0) {
            const fetchFilteredData = async () => {
                setIsLoading(true);
                try {
                    await loginInfoByFilter(setLoginInfos, param, filterDatas);
                } catch (error) {
                    console.error(error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchFilteredData();
        }
    }, [filterDatas]);

    const toggleFilter = () => {
        setShowFilter((prev) => !prev);
    }

    return (
        <div>
            <div className="p-6">
                <div className="flex space-x-10 items-center justify-end">
                    <FilterButton onClick={toggleFilter} />
                </div>
                {showFilter && (
                    <div className="absolute right-6 z-10">
                        <FilterConditions currentPage="loginlog" setFilterData={setFilterData} page={page} setPage={setPage} dataPage={loginInfos.totalPages} />
                    </div>
                )}
            </div>
            {isLoading ? (
                <div className="p-6">
                    <SkeletonLoader />
                </div>
            ) : (
            <DataTable columns={loginSearchColumn()} data={loginInfos.content} dataPage={loginInfos.totalPages} setFilterData={setFilterData} filterDatas={filterDatas} page={page} setPage={setPage} />
                )}
        </div>
    );
};

export default LoginSearchPage;