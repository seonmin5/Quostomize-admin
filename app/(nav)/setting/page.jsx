'use client'

import Tabs from "../../../components/button/tabButton"
import LoginSearchPage from "../../../components/information/loginSearch";
import NotiSearchPage from "../../../components/setting/notiSearchPage"
import ScrollUpButton from "../../../components/button/scrollUpButton";

const Setting = () => {
    const tabs = ["로그인 로그", "알림 로그"];
    return (
        <div className="pl-2">
            <div className="pt-6 pl-4 pr-6 pb-2">
                <Tabs tabs={tabs} initialIndex={0} onChange={(index) => console.log(`Tab changed: ${index}`)}>
                    <LoginSearchPage/>
                    <NotiSearchPage/>
                </Tabs>
            </div>
            <ScrollUpButton/>
        </div>
    )
}

export default Setting;