'use client'

import FilterButton from "../../components/button/filterButton";
import FilterConditions from "../../components/button/filterConditionByLoginLog";
import { loginSearchColumn } from "../../components/column/loginSearchColumn"
import { loginInfo, loginInfoByFilter } from "../apiMethodList/loginSearch/get"
import { useEffect, useState } from "react";


// test
import DataTable from "../table/loginDataTable";
import LoadingModal from "../modal/loadingModal";

const LoginSearchPage = () => {
    const [loginInfos, setLoginInfos] = useState([])
    const [filterDatas, setFilterData] = useState({})
    const [showFilter, setShowFilter] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(0);
    const param = new URLSearchParams()

    useEffect(() => {
        try {
            loginInfo(setLoginInfos)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        filterDatas.page >= 0 ? loginInfoByFilter(setLoginInfos, param, filterDatas) : null
    }, [filterDatas])

    // Columns 정의
    const columns = loginSearchColumn()

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
                    <div className="absolute right-6 z-10">  {/* 필터 패널의 위치 조정 */}
                        <FilterConditions currentPage="loginlog" setFilterData={setFilterData} page={page} setPage={setPage} dataPage={loginInfos.totalPages} />
                    </div>
                )}
            </div>
            {isLoading && <LoadingModal message={"로딩 중입니다"} isOpen={isLoading} />}
            {<DataTable columns={columns} data={loginInfos.content} dataPage={loginInfos.totalPages} setFilterData={setFilterData} filterDatas={filterDatas} page={page} setPage={setPage} />}
        </div>
    );
};

export default LoginSearchPage;