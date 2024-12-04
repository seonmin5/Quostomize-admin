'use client'

import Tabs from "../../../components/button/tabButton";
import FranchisesEditPage from "../../../components/franchises/franchisesEdit";

const Franchises = () => {
    const tabs = ["가맹점 관리"];
    return (
        <div className="pt-6 pl-8">
            <Tabs tabs={tabs} initialIndex={0} onChange={(index) => console.log(`Tab changed: ${index}`)}>
                <FranchisesEditPage />
            </Tabs>
        </div>
    );
}

export default Franchises;