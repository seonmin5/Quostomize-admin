'use client'
import React, { useState } from 'react'

const MailHeader = () => {
  const [selectedIndex, setIndex] = useState(0);
  const changeTab = () => {
    setIndex((prev) => {
      if (prev) {
        return 0;
      } else {
        return 1;
      }
    })
  }

  return (
    <div className="w-full h-20 bg-content-secondary1 leading-20 text-xl font-bold flex gap-10 items-center pl-10">
      <div
        className={`${selectedIndex === 0 ? "" : "text-content-accent2"} cursor-pointer`}
        onClick={() => {changeTab()}}
      >
        전체 알림
      </div>
      <div
        className={`${selectedIndex === 1 ? "" : "text-content-accent2"} cursor-pointer`}
        onClick={() => {changeTab()}}
      >
        선택 알림
      </div>
    </div>
  )
}

export default MailHeader;