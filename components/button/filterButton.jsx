'use client'

const FilterButton = ({onClick}) => {
    return (
        <button onClick={onClick} className="w-8 h-8">
            <img src="/icons/filter.png" alt="필터 아이콘" className="w-full h-full cursor-pointer"/>
        </button>
    )
};

export default FilterButton;