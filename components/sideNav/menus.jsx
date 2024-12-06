'use client'

import React, { useState, useEffect } from 'react'
import NavMenuItem from "./navMenuItem";
import { usePathname } from 'next/navigation'

const Menus = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const pathName = usePathname();
  
  const items = [
    ["정보 조회", "information", "/icons/information.png"],
    ["알림 설정", "notifications", "/icons/notification.png"],
    ["이용자 관리", "members", "/icons/user.png"],
    ["카드 관리", "cards", "/icons/card.png"],
    ["가맹점 관리", "franchises", "/icons/franchise.png"],
    ["대시보드", process.env.NEXT_PUBLIC_GRAFANA, "/icons/dashboard.png"],
    ["환경설정", "setting", "/icons/setting.png"],
  ]

  useEffect(() => {
    switch (pathName) {
      case "/information":
        setActiveIndex(0);
        break;
      case "/notifications":
        setActiveIndex(1);
        break;
      case "/members":
        setActiveIndex(2);
        break;
      case "/cards":
        setActiveIndex(3);
        break;
      case "/franchises":
        setActiveIndex(4);
        break;
      case "/setting":
        setActiveIndex(6);
        break;
    }
  },[pathName])

  return (
    <div>
    <h2 className="pt-8 pr-8 pl-8 pb-6 font-bold text-white text-lg">사이트 관리</h2>
    <ul className="space-y-1">
      {items.map((item,index) => {
        return <NavMenuItem menuName={item[0]} menuHref={item[1]} iconSrc={item[2]} index={index} activeIndex={activeIndex} setActiveIndex={setActiveIndex} key={index}/>
      })}
    </ul>
</div>
  )
}

export default Menus