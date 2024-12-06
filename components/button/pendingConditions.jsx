'use client'

import { useState } from 'react';
import SubmitButton from "../../components/button/submitButton";

const PendingConditions = ({setFilterData, page, setPage, dataPage}) => {
    const [sortDirection, setSortDirection] = useState("DESC");
    const handlePageChange = (e) => setPage(e.target.value);
    const handleSortDirectionChange = (e) => setSortDirection(e.target.value);
    const handleApplyFilter = () => {
        const filterData = { page, sortDirection };
        setFilterData(filterData)
    };


    return (
        <div className="w-[200px] mt-4 p-4 border rounded-md bg-gray-100">
            <h3 className="font-bold mb-4">필터 조건</h3>
            <div className="space-y-2">
                {/* 공통 필터 옵션 */}
                    <div>
                        <label htmlFor="page" className="block text-sm font-bold">페이지</label>
                        <input
                            id="page"
                            type="number"
                            value={page + 1}
                            onChange={handlePageChange}
                            className="w-full p-2 border rounded-md"
                            min="0"
                        />
                    </div>

                    <div>
                        <label htmlFor="sortDirection" className="block text-sm font-bold">날짜 정렬</label>
                        <select
                            id="sortDirection"
                            value={sortDirection}
                            onChange={handleSortDirectionChange}
                            className="w-full p-2 border rounded-md"
                        >
                            <option value="ASC">오름차순</option>
                            <option value="DESC">내림차순</option>
                        </select>
                    </div>

                {/* 필터 적용 버튼 */}
                <div>
                    <SubmitButton onClick={handleApplyFilter}/>
                </div>
            </div>
        </div>
    );
};

export default PendingConditions;