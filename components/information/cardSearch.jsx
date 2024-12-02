'use client'
import SearchBar from "../../components/button/searchBar";
import FilterButton from "../../components/button/filterButton";
import FilterConditions from "../../components/button/filterConditions";
import {useState} from "react";

const CardSearchPage = () => {
    const [showFilter, setShowFilter] = useState(false);
    const handleSearch = (query) => {
        console.log(`검색어: ${query}`);
    };
    const toggleFilter= () => {
        setShowFilter((prev) => !prev);
    }

    return (
        <div>
            <div className="p-6">
                <div className="flex space-x-10 items-center justify-end">
                    <SearchBar onSearch={handleSearch}/>
                    <FilterButton onClick={toggleFilter}/>
                </div>
                {showFilter && (
                    <div className="absolute right-6 z-10">  {/* 필터 패널의 위치 조정 */}
                        <FilterConditions currentPage="cards"/>
                    </div>
                )}
            </div>
            <p>카드 조회 탭입니다.</p>
        </div>
    );
};

export default CardSearchPage;