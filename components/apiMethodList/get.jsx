// 일반 전체 조회
export async function cardInfo(setCardInfo) {

    try {
        const response = await fetch(`/api/manager/cardInfo`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',  // 요청 본문이 JSON임을 지정
            },
        });
        if (!response.ok) {
            throw new Error('값이 조회되지 않았습니다.');
        }
        const data = await response.json(); // 응답을 JSON으로 파싱
        setCardInfo(data);
    } catch (error) {
        console.error('데이터 가져오기 오류:', error);
    }
}

//필터 적용한 후 조회
export async function cardInfoByFilter(setCardInfo, param, filterDatas) {
    param.append("page", filterDatas.page)
    param.append("sortDirection", filterDatas.sortDirection)
    param.append("status", filterDatas.status)
    try {
        const response = await fetch(`/api/manager/cardInfoByFilter?${param}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',  // 요청 본문이 JSON임을 지정
            },
        });
        if (!response.ok) {
            throw new Error('값이 조회되지 않았습니다.');
        }
        const data = await response.json(); // 응답을 JSON으로 파싱
        setCardInfo(data);
    } catch (error) {
        console.error('데이터 가져오기 오류:', error);
    }
}

//필터 적용한 후 조회
export async function cardInfoByKeyword(setCardInfo, param, filterDatas) {
    param.append("page", filterDatas.page)
    param.append("searchTerm", filterDatas.searchTerm)
    try {
        const response = await fetch(`/api/manager/cardInfoByKeyword?${param}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',  // 요청 본문이 JSON임을 지정
            },
        });
        if (!response.ok) {
            throw new Error('값이 조회되지 않았습니다.');
        }
        const data = await response.json(); // 응답을 JSON으로 파싱
        setCardInfo(data);
    } catch (error) {
        console.error('데이터 가져오기 오류:', error);
    }
}