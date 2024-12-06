export async function paymentRecordInfo(setPaymentRecordInfo) {

    try {
        const response = await fetch(`/api/manager/paymentRecordSearch/paymentRecordInfo`, {
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
        setPaymentRecordInfo(data);
    } catch (error) {
        console.error('데이터 가져오기 오류:', error);
    }
}

export async function paymentRecordInfoByFilter(setPaymentRecordInfo, param, filterDatas) {

    param.append("page", filterDatas.page)
    param.append("sortDirection", filterDatas.sortDirection)

    try {
        const response = await fetch(`/api/manager/paymentRecordSearch/paymentRecordInfoByFilter?${param}`, {
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
        setPaymentRecordInfo(data);
    } catch (error) {
        console.error('데이터 가져오기 오류:', error);
    }
}

export async function paymentRecordInfoByKeyword(setPaymentRecordInfo, param, filterDatas) {

    param.append("page", filterDatas.page)
    param.append("searchAmount", filterDatas.searchAmount)
    param.append("searchType", filterDatas.searchType)

    try {
        const response = await fetch(`/api/manager/paymentRecordSearch/paymentRecordInfoByKeyword?${param}`, {
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
        setPaymentRecordInfo(data);
    } catch (error) {
        console.error('데이터 가져오기 오류:', error);
    }
}