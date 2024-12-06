'use client'
import SearchBar from "../button/searchBarV2";
import FilterButton from "../../components/button/filterButton";
import FilterConditions from "../button/filterConditionsV2";
import { paymentRecordSearchColumn } from "../column/paymentRecordSearchColumn";
import { paymentRecordInfo, paymentRecordInfoByFilter, paymentRecordInfoByKeyword } from "../../service/apiMethodList/paymentRecordSearch/get"
import { useEffect, useState } from "react";

// test
import DataTable from "../table/paymentRecordDataTable";

const PaymentRecordsSearch = () => {
    const [paymentRecordInfos, setPaymentRecordInfo] = useState([])
    const [filterDatas, setFilterData] = useState({})
    const [showFilter, setShowFilter] = useState(false)
    const [page, setPage] = useState(0)
    const [value, setValue] = useState("")
    const param = new URLSearchParams()
    // Dummy data

    useEffect(() => {
        paymentRecordInfo(setPaymentRecordInfo)
    }, [])

    useEffect(() => {
        Object.keys(filterDatas).length < 3
            ? filterDatas.page >= 0 ? paymentRecordInfoByFilter(setPaymentRecordInfo, param, filterDatas) : null
            : filterDatas.page >= 0 ? paymentRecordInfoByKeyword(setPaymentRecordInfo, param, filterDatas) : null
    }, [filterDatas])

    // Columns
    const columns = paymentRecordSearchColumn()

    const handleSearch = (query) => {
        const keywordDatas = {
            page: page,
            searchAmount: query === "" ? 0 : query,
            searchType: value
        }
        setFilterData(keywordDatas)
    };

    const toggleFilter = () => {
        setShowFilter((prev) => !prev);
    }

    return (
        <div>
            <div className="p-6">
                <div className="flex space-x-10 items-center justify-end">
                    <SearchBar onSearch={handleSearch} placeholder="이용 금액을 입력해주세요" onClick={handleSearch}>
                        <select
                            id="AmountStandard"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            className="w-full p-2 mt-2 border rounded-md"
                        >
                            <option value="EQUAL">EQUAL</option>
                            <option value="GREATER">GREATER</option>
                            <option value="LESS">LESS</option>
                        </select>
                    </SearchBar>
                    <FilterButton onClick={toggleFilter} />
                </div>
                {showFilter && (
                    <div className="absolute right-6 z-10">  {/* 필터 패널의 위치 조정 */}
                        <FilterConditions currentPage="payments" setFilterData={setFilterData} page={page} setPage={setPage} dataPage={paymentRecordInfos.totalPage} />
                    </div>
                )}
            </div>
            <DataTable columns={columns} data={paymentRecordInfos.content} dataPage={paymentRecordInfos.totalPage} setFilterData={setFilterData} filterDatas={filterDatas} page={page} setPage={setPage} />
        </div>
    );
};

export default PaymentRecordsSearch;