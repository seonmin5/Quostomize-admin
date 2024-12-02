'use client'
import SearchBar from "../../components/button/searchBar";

const CardSearchPage = () => {
    const handleSearch = (query) => {
        console.log(`검색어: ${query}`);
    };    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            <p>카드 조회 탭입니다.</p>
        </div>
    );
};

export default CardSearchPage;