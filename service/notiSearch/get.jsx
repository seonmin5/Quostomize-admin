export async function NotiInfo() {

    try {
        const response = await fetch(`/api/setting/noti/info`, {
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
        return data;
    } catch (error) {
        console.error('전체 - 데이터 가져오기 오류:', error);
        throw error;
    }
}

export async function NotiInfoByFilter(setNotiInfo, param, filterData) {
    param.append("page", filterData.page)
    param.append("size", filterData.size)
    param.append("sortBy", filterData.sortBy)
    param.append("direction", filterData.direction)
    try {
        const response = await fetch(`/api/setting/noti/filter?${param}`, {
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
        return data;

    } catch (error) {
        console.error('필터 - 데이터 가져오기 오류:', error);
    }
}