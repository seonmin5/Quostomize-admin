'use client'

import Tabs from "../../../components/button/tabButton";
import MembersEditPage from "../../../components/members/membersEdit"
import ScrollUpButton from "../../../components/button/scrollUpButton";


const Member = () => {
    const tabs = ["이용자 관리"];
    return (
        <div className="pl-2">
            <div className="pt-8 pl-4 pr-6 pb-2">
                <Tabs tabs={tabs} initialIndex={0} onChange={(index) => console.log(`Tab changed: ${index}`)}>
                    <MembersEditPage/>
                </Tabs>
            </div>
            <ScrollUpButton/>
        </div>
    )
}

export default Member;