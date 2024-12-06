'use client'

import Tabs from "../../../components/button/tabButton";
import CancellationPendingPage from "../../../components/cards/cancellationPending";
import CreationPendingPage from "../../../components/cards/creationPending";
import ScrollUpButton from "../../../components/button/scrollUpButton";

const Card = () => {
    const tabs = ["카드 신청 내역", "정지 신청 내역"];
    return (
        <div className="pl-2">
            <div className="pt-6 pl-4 pr-6 pb-2">
                <Tabs tabs={tabs} initialIndex={0} onChange={(index) => console.log(`Tab changed: ${index}`)}>
                    <CreationPendingPage />
                    <CancellationPendingPage />
                </Tabs>
            </div>
            <ScrollUpButton />
        </div>
    )
}

export default Card;