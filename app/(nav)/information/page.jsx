'use client'

import Tabs from "../../../components/button/tabButton";
import ScrollUpButton from "../../../components/button/scrollUpButton";
import CardSearchPage from "../../../components/information/cardSearch";
import LoginSearchPage from "../../../components/information/loginSearch";
import MemberSearchPage from "../../../components/information/memberSearch";
import PaymentSearchPage from "../../../components/information/paymentRecordsSearch";


const Information = () => {
    const tabs = ["카드 조회", "이용자 조회", "이용 기록 조회", "로그인 로그 조회"];
    return (
        <div className="pl-2">
            <div className="pt-8 pl-4 pr-6 pb-2">
                <Tabs tabs={tabs} initialIndex={0} onChange={(index) => console.log(`Tab changed: ${index}`)}>
                    <CardSearchPage/>
                    <MemberSearchPage/>
                    <PaymentSearchPage/>
                    <LoginSearchPage/>
                </Tabs>
            </div>
            <ScrollUpButton/>
        </div>
    )
}

export default Information;