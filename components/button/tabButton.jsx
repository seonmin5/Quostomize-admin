'use client'
import {useState} from "react";
import React from "react";

const Tabs = ({tabs, initialIndex = 0, onChange, children}) => {
    const [activeIndex, setActiveIndex] = useState(initialIndex);
    const normalizedChildren = React.Children.toArray(children);
    const handleTabClick = (index) => {
        setActiveIndex(index);
        if (onChange) onChange(index);
    };

    return (
        <div>
            <div role={"tablist"} className="flex space-x-4 border-b">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        role="tab"
                    aria-selected={activeIndex === index}
                    onClick={() => handleTabClick(index)}
                    className={`py-2 px-4 text-gray-600 hover:text-[#3081F7] ${
                        activeIndex === index ? "border-b-4 border-[#3081F7] font-semibold text-[#3081F7]" : ""
                    }`}>
                        {tab}
                    </button>
                ))}
            </div>
            <div role="tabpanel">
                {normalizedChildren[activeIndex]}
            </div>
        </div>
    )
}

export default Tabs;