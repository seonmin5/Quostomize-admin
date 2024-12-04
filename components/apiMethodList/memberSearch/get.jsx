export async function memberInfo(setMemberInfo) {

    try {
        const response = await fetch(`/api/manager/memberSearch/memberInfo`, {
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
        setMemberInfo(data);
    } catch (error) {
        console.error('데이터 가져오기 오류:', error);
    }
}

export async function memberInfoByFilter(setMemberInfo, param, filterDatas) {
    param.append("page", filterDatas.page)
    param.append("sortDirection", filterDatas.sortDirection)
    param.append("memberRole", filterDatas.memberRole)
    try {
        const response = await fetch(`/api/manager/memberSearch/memberInfoByFilter?${param}`, {
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
        setMemberInfo(data);
    } catch (error) {
        console.error('데이터 가져오기 오류:', error);
    }
}

export async function memberInfoByKeyword(setMemberInfo, param, filterDatas) {
    param.append("page", filterDatas.page)
    param.append("searchTerm", filterDatas.searchTerm)

    try {
        const response = await fetch(`/api/manager/memberSearch/memberInfoByKeyword?${param}`, {
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
        setMemberInfo(data);
    } catch (error) {
        console.error('데이터 가져오기 오류:', error);
    }
}