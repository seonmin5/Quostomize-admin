export async function loginInfo(setLoginInfos) {

    try {
        const response = await fetch(`/api/manager/loginSearch/loginInfo`, {
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
        setLoginInfos(data);
    } catch (error) {
        console.error('데이터 가져오기 오류:', error);
    }
}

export async function loginInfoByFilter(setLoginInfos, param, filterDatas) {
    param.append("page", filterDatas.page)
    param.append("size", filterDatas.size)
    param.append("sortBy", filterDatas.sortBy)
    param.append("direction", filterDatas.direction)
    try {
        const response = await fetch(`/api/manager/loginSearch/loginInfoByFilter?${param}`, {
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
        setLoginInfos(data);
    } catch (error) {
        console.error('데이터 가져오기 오류:', error);
    }
}