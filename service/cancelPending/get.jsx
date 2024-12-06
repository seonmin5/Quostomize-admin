// 전체 조회
export async function CardInfo() {
    try {
        const response = await fetch(`/api/cards/cancellationPending/info`, {
            method: 'GET',
            credentials: 'include',
            cache: "no-store",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('값이 조회되지 않았습니다.');
        }
        const data = await response.json();
        if (!data) {
            throw new Error('데이터가 없습니다.');
        }

        return data.data;
    } catch (error) {
        console.error('전체 - 데이터 가져오기 오류:', error);
        throw error;
    }
}

// 필터
export async function CardInfoByFilter(setCardInfo, param, filterData) {
    param.append("page", filterData.page)
    param.append("sortDirection", filterData.sortDirection)
    try {
        const response = await fetch(`/api/cards/cancellationPending/filter?${param}`, {
            method: 'GET',
            credentials: 'include',
            cache: "no-store",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('값이 조회되지 않았습니다.');
        }
        const data = await response.json();

        if (!data) {
            throw new Error('데이터가 없습니다.');
        }
        return data.data;

    } catch (error) {
        console.error('필터 - 데이터 가져오기 오류:', error);
    }
}

// 검색어
export async function CardInfoByKeyword(setCardInfo, param, filterData) {
    param.append("page", filterData.page)
    param.append("searchTerm", filterData.searchTerm)
    try {
        const response = await fetch(`/api/cards/cancellationPending/search?${param}`, {
            method: 'GET',
            credentials: 'include',
            cache: "no-store",
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('값이 조회되지 않았습니다.');
        }
        const data = await response.json();
        if (!data) {
            throw new Error('데이터가 없습니다.');
        }
        return data.data;
    } catch (error) {
        console.error('검색 - 데이터 가져오기 오류:', error);
    }
}