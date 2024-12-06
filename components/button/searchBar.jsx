'use client'

import { useState } from "react";

const SearchBar = ({ placeholder = "여기에 내용을 검색해 보세요", onSearch }) => {
    const [query, setQuery] = useState("");
    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && onSearch) {
            onSearch(query);
        }
    };

    return (
        <div className="relative w-64">
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="w-64 px-4 py-2 pr-10 border bg-[#F2F4F6] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3081F7]"
            />
            <button className="absolute left-[260px] top-1/2 transform -translate-y-1/2 w-8 h-8" onClick={() => onSearch(query)}>
                <img
                    src="/icons/magnifying-glass.png" alt="검색 아이콘" className="w-full h-full cursor-pointer"
                />
            </button>
        </div>
    );
}

export default SearchBar;