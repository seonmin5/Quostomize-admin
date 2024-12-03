'use client'

import Tabs from "../../../components/button/tabButton";
import MembersEditPage from "../../../components/members/membersEdit"

const Member = () => {
    const tabs = ["이용자 관리"];
    return (
    <div className="pt-6 pl-8">
        <Tabs tabs={tabs} initialIndex={0} onChange={(index) => console.log(`Tab changed: ${index}`)}>
            <MembersEditPage />
        </Tabs>
    </div>
  )
}

export default Member;