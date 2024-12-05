'use client'
import SearchBar from "../../components/button/searchBar";
import FilterButton from "../../components/button/filterButton";
import PendingConditions from "../../components/button/pendingConditions";
import {useEffect, useState} from "react";
import CheckBoxTable from "../../components/table/checkBoxTable"
import SubmitButtonV2 from "../../components/button/submitButtonV2";
import {CancelPendingColumns} from "../../components/column/cancelPendingColumns";
import {CardInfo, CardInfoByFilter, CardInfoByKeyword} from "../../service/cancelPending/get";

const CancellationPendingPage = () => {
    const [cardInfo, setCardInfo] = useState(
        {
            content: [],
            currentPage: 0,
            totalPage: 1
        });
    const [isLoading, setIsLoading] = useState(true);
    const [filterData, setFilterData] = useState({ page: 0 });
    const [showFilter, setShowFilter] = useState(false);
    const [page, setPage] = useState(0);
    const [selectedRows, setSelectedRows] = useState([]);
    const [error, setError] = useState(null);
    const param = new URLSearchParams();

    useEffect(() => {
        const getCardInfo = async () => {
            setIsLoading(true);
            try {
                const response = await CardInfo();
                setCardInfo(response);
            } catch (err) {
                setError("데이터를 불러오는 중 문제가 발생했습니다.");
                console.error("Error fetching data:", err);
            } finally {
                setIsLoading(false);
            }
        };
        getCardInfo();
    }, []);

    useEffect(() => {
        if (filterData.page >= 0) {
            const fetchFilteredData = async () => {
                try {
                    const response = await CardInfoByFilter(setCardInfo, param, filterData);
                    setCardInfo(response);
                } catch (err) {
                    console.error("Error fetching filtered data:", err);
                }
            };
            fetchFilteredData();
        }
    }, [filterData]);

    const handleSearch = async (query) => {
        const keywordData = {
            page: page,
            searchTerm: query
        }
        try {
            const response = await CardInfoByKeyword(setCardInfo, param, keywordData);
            setCardInfo(response);
        } catch (err) {
            console.error("Error searching data:", err);
        }
    };

    const toggleFilter = () => {
        setShowFilter((prev) => !prev);
    }

    const handleApprove = () => {
        const approvedData = selectedRows.map((index) => cardInfo.content[index]);
        alert(`${approvedData.length}개의 행이 승인되었습니다.`);
        setSelectedRows([]);
    };

    if (isLoading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <div className="p-6">
                <div className="flex space-x-10 items-center justify-between">
                    <div>
                        <SubmitButtonV2 onClick={handleApprove} disabled={selectedRows.length === 0}>
                            카드 정지
                        </SubmitButtonV2>
                    </div>
                    <div className="items-center flex space-x-10">
                        <SearchBar onSearch={handleSearch} placeholder="Member Id를 입력해 주세요" onClick={handleSearch}/>
                        <FilterButton onClick={toggleFilter}/>
                    </div>
                </div>
                {showFilter && (
                    <div className="absolute right-6 z-10">
                        <PendingConditions
                            setFilterData={setFilterData}
                            page={page}
                            setPage={setPage}
                            dataPage={cardInfo.totalPage}
                        />
                    </div>
                )}
            </div>
            <CheckBoxTable
                columns={CancelPendingColumns()}
                data={cardInfo.content}
                setFilterData={setFilterData}
                filterData={filterData}
                page={cardInfo.currentPage}
                setPage={setPage}
                dataPage={cardInfo.totalPage}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
            />
        </div>
    );
}

export default CancellationPendingPage;