'use client'

import { useEffect, useState } from "react";
import ApprovalButton from "../../components/button/approvalButton";
import MerchantModal from "../../components/modal/merchantModal";
import CheckBoxTableV3 from "../../components/table/checkBoxTableV3";
import SkeletonLoader from "../../components/spinner/skeletonLoader";

const FranchisesEditPage = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedIds, setSelectedIds] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [page, setPage] = useState(0);

    const columns = [
        { Header: 'Franchise ID', accessor: 'franchiseId' },
        { Header: 'Franchise Name', accessor: 'franchiseName' },
        { Header: 'Parent Benefit Code ID', accessor: 'parentBenefitCodeId' },
        { Header: 'Parent Benefit Type', accessor: 'parentBenefitType' },
        { Header: 'Common Benefit ID', accessor: 'commonBenefitId' },
        { Header: 'Category Type', accessor: 'categoryType' },
    ];

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const mockData = [
                { franchiseId: 1, franchiseName: '더현대', parentBenefitCodeId: 1, parentBenefitType: '쇼핑', commonBenefitId: 100, categoryType: '백화점' },
                { franchiseId: 2, franchiseName: '신세계', parentBenefitCodeId: 1, parentBenefitType: '쇼핑', commonBenefitId: 100, categoryType: '백화점' },
                { franchiseId: 3, franchiseName: '롯데백화점', parentBenefitCodeId: 1, parentBenefitType: '쇼핑', commonBenefitId: 100, categoryType: '백화점' },
                { franchiseId: 4, franchiseName: '무신사', parentBenefitCodeId: 1, parentBenefitType: '쇼핑', commonBenefitId: 101, categoryType: '온라인쇼핑' },
                { franchiseId: 5, franchiseName: '에이블리', parentBenefitCodeId: 1, parentBenefitType: '쇼핑', commonBenefitId: 101, categoryType: '온라인쇼핑' },
                { franchiseId: 6, franchiseName: '이마트', parentBenefitCodeId: 1, parentBenefitType: '쇼핑', commonBenefitId: 102, categoryType: '마트' },
                { franchiseId: 7, franchiseName: '홈플러스', parentBenefitCodeId: 1, parentBenefitType: '쇼핑', commonBenefitId: 102, categoryType: '마트' },
                { franchiseId: 8, franchiseName: 'SK 주유소', parentBenefitCodeId: 2, parentBenefitType: '생활', commonBenefitId: 200, categoryType: '주유소' },
                { franchiseId: 9, franchiseName: 'GS칼텍스', parentBenefitCodeId: 2, parentBenefitType: '생활', commonBenefitId: 200, categoryType: '주유소' },
                { franchiseId: 10, franchiseName: 'SKT', parentBenefitCodeId: 2, parentBenefitType: '생활', commonBenefitId: 201, categoryType: '통신' },
                { franchiseId: 11, franchiseName: 'KT', parentBenefitCodeId: 2, parentBenefitType: '생활', commonBenefitId: 201, categoryType: '통신' },
                { franchiseId: 12, franchiseName: 'LGU+', parentBenefitCodeId: 2, parentBenefitType: '생활', commonBenefitId: 201, categoryType: '통신' },
                { franchiseId: 13, franchiseName: '버스', parentBenefitCodeId: 2, parentBenefitType: '생활', commonBenefitId: 202, categoryType: '대중교통' },
                { franchiseId: 14, franchiseName: '지하철', parentBenefitCodeId: 2, parentBenefitType: '생활', commonBenefitId: 202, categoryType: '대중교통' },
                { franchiseId: 15, franchiseName: '택시', parentBenefitCodeId: 2, parentBenefitType: '생활', commonBenefitId: 202, categoryType: '대중교통' },
                { franchiseId: 16, franchiseName: 'CU', parentBenefitCodeId: 3, parentBenefitType: '푸드', commonBenefitId: 300, categoryType: '편의점' },
                { franchiseId: 17, franchiseName: 'GS25', parentBenefitCodeId: 3, parentBenefitType: '푸드', commonBenefitId: 300, categoryType: '편의점' },
                { franchiseId: 18, franchiseName: '스타벅스', parentBenefitCodeId: 3, parentBenefitType: '푸드', commonBenefitId: 301, categoryType: '카페' },
                { franchiseId: 19, franchiseName: '투썸플레이스', parentBenefitCodeId: 3, parentBenefitType: '푸드', commonBenefitId: 301, categoryType: '카페' },
                { franchiseId: 20, franchiseName: '배달의민족', parentBenefitCodeId: 3, parentBenefitType: '푸드', commonBenefitId: 302, categoryType: '배달' },
                { franchiseId: 21, franchiseName: '쿠팡이츠', parentBenefitCodeId: 3, parentBenefitType: '푸드', commonBenefitId: 302, categoryType: '배달' },
                { franchiseId: 22, franchiseName: '인터파크투어', parentBenefitCodeId: 4, parentBenefitType: '여행', commonBenefitId: 400, categoryType: '투어' },
                { franchiseId: 23, franchiseName: '마이리얼트립', parentBenefitCodeId: 4, parentBenefitType: '여행', commonBenefitId: 400, categoryType: '투어' },
                { franchiseId: 24, franchiseName: '쏘카', parentBenefitCodeId: 4, parentBenefitType: '여행', commonBenefitId: 401, categoryType: '차량' },
                { franchiseId: 25, franchiseName: '그린카', parentBenefitCodeId: 4, parentBenefitType: '여행', commonBenefitId: 401, categoryType: '차량' },
                { franchiseId: 26, franchiseName: '야놀자', parentBenefitCodeId: 4, parentBenefitType: '여행', commonBenefitId: 402, categoryType: '숙소' },
                { franchiseId: 27, franchiseName: '에어비앤비', parentBenefitCodeId: 4, parentBenefitType: '여행', commonBenefitId: 402, categoryType: '숙소' },
                { franchiseId: 28, franchiseName: '넷플릭스', parentBenefitCodeId: 5, parentBenefitType: '문화', commonBenefitId: 500, categoryType: 'OTT' },
                { franchiseId: 29, franchiseName: '티빙', parentBenefitCodeId: 5, parentBenefitType: '문화', commonBenefitId: 500, categoryType: 'OTT' },
                { franchiseId: 30, franchiseName: 'CGV', parentBenefitCodeId: 5, parentBenefitType: '문화', commonBenefitId: 501, categoryType: '영화관' },
                { franchiseId: 31, franchiseName: '롯데시네마', parentBenefitCodeId: 5, parentBenefitType: '문화', commonBenefitId: 501, categoryType: '영화관' },
                { franchiseId: 32, franchiseName: '밀리의서재', parentBenefitCodeId: 5, parentBenefitType: '문화', commonBenefitId: 502, categoryType: '도서' },
                { franchiseId: 33, franchiseName: '교보문고', parentBenefitCodeId: 5, parentBenefitType: '문화', commonBenefitId: 502, categoryType: '도서' },
            ];
            await new Promise((resolve) => setTimeout(resolve, 500));
            setData(mockData);
        } catch (error) {
            console.error("데이터를 불러오는 중 문제가 발생했습니다:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleApprove = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleSave = (values) => {
        setTimeout(() => {
            setIsModalOpen(false);
        }, 3000);
    };

    return (
        <div>
            <div className="p-6">
                <div className="flex space-x-10 items-center justify-between">
                    <ApprovalButton onClick={handleApprove} />
                    <MerchantModal
                        visible={isModalOpen}
                        onCancel={handleCancel}
                        onSave={handleSave}
                    />
                </div>
            </div>
            {isLoading ? (
                <div className="p-6">
                    <SkeletonLoader/>
                </div>
            ) : (
                <CheckBoxTableV3
                    columns={columns}
                    data={data}
                    selectedRows={selectedIds}
                    setSelectedRows={setSelectedIds}
                    page={page}
                    setPage={setPage}
                />
            )}
        </div>
    );
};

export default FranchisesEditPage;