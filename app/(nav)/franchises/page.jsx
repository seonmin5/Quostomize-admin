'use client'

import Tabs from "../../../components/button/tabButton";
import FranchisesEditPage from "../../../components/franchises/franchisesEdit";
import ScrollUpButton from "../../../components/button/scrollUpButton";


const Franchises = () => {
    const tabs = ["가맹점 관리"];
    return (
        <div className="pl-2">
            <div className="pt-6 pl-4 pr-6 pb-2">
                <Tabs tabs={tabs} initialIndex={0} onChange={(index) => console.log(`Tab changed: ${index}`)}>
                    <FranchisesEditPage/>
                </Tabs>
            </div>
            <ScrollUpButton />
        </div>
    );
}

export default Franchises;