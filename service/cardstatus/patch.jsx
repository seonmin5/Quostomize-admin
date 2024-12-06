export const PatchCardStatus = async (data, setError) => {
    try {
        const response = await fetch(`api/cards/cardStatus`, {
            method: "PATCH",
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data
            )
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message || `HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error - 카드 불러오기: ', error.message);
        setError(error.message);
    }
}