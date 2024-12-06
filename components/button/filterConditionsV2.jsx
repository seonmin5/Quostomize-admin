'use client'

import { useState } from 'react';
import SubmitButton from "../../components/button/submitButton";

const FilterConditions = ({ currentPage, setFilterData, page, setPage, totalPage }) => {
    const [sortDirection, setSortDirection] = useState("DESC");
    const [status, setStatus] = useState("");
    const [memberRole, setMemberRole] = useState([]);

    const filterOptions = {
        cards: ['page', 'sortDirection', 'status'],
        members: ['page', 'sortDirection', 'memberRole'],
        payments: ['page', 'sortDirection'],
    };

    const handlePageChange = (e) => setPage(e.target.value - 1);
    const handleSortDirectionChange = (e) => setSortDirection(e.target.value);
    const handleStatusChange = (e) => setStatus(e.target.value);
    const handleMemberRoleChange = (e) => {
        const role = e.target.value;
        setMemberRole(prev =>
            prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]
        );
    };

    const handleApplyFilter = () => {
        const filterData = { page, sortDirection };
        if (currentPage === 'cards') filterData.status = status;
        if (currentPage === 'members') filterData.memberRole = memberRole;
        setFilterData(filterData)
        console.log("필터 적용:", filterData);
    };

    return (
        <div className="w-[200px] mt-4 p-4 border rounded-md bg-gray-100">
            <h3 className="font-bold mb-4">필터 조건</h3>
            <div className="space-y-2">
                {/* 공통 필터 옵션 */}
                {filterOptions[currentPage].includes('page') && (
                    <div>
                        <label htmlFor="page" className="block text-sm font-bold">페이지</label>
                        <input
                            id="page"
                            type="number"
                            value={page + 1}
                            onChange={handlePageChange}
                            className="w-full p-2 border rounded-md"
                            min="1"
                            max={totalPage}
                        />
                    </div>
                )}

                {filterOptions[currentPage].includes('sortDirection') && (
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
                )}

                {/* 카드 페이지 전용 필터 */}
                {currentPage === 'cards' && (
                    <div>
                        <label htmlFor="status" className="block text-sm font-bold">카드 상태</label>
                        <select
                            id="status"
                            value={status}
                            onChange={handleStatusChange}
                            className="w-full p-2 border rounded-md"
                        >
                            <option value="">전체</option>
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="CREATION_PENDING">CREATION_PENDING</option>
                            <option value="CANCELLATION_PENDING">CANCELLATION_PENDING</option>
                            <option value="CANCELLED">CANCELLED</option>
                        </select>
                    </div>
                )}

                {/* 고객 페이지 전용 필터 */}
                {currentPage === 'members' && (
                    <div>
                        <label className="block text-sm font-bold">회원 역할</label>
                        {['ROLE_MEMBER', 'ROLE_OM', 'ROLE_SM'].map(role => (
                            <div key={role}>
                                <input
                                    type="checkbox"
                                    id={role}
                                    value={role}
                                    checked={memberRole.includes(role)}
                                    onChange={handleMemberRoleChange}
                                />
                                <label htmlFor={role}>{role}</label>
                            </div>
                        ))}
                    </div>
                )}

                {/* 필터 적용 버튼 */}
                <div>
                    <SubmitButton onClick={handleApplyFilter} />
                </div>
            </div>
        </div>
    );
};

export default FilterConditions;