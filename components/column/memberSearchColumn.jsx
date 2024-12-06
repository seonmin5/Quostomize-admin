// Columns
export function memberSearchColumn() {
    return (
        [
            {
                Header: 'Member ID',
                accessor: 'memberId',
            },
            {
                Header: 'Member Name',
                accessor: 'memberName',
            },
            {
                Header: 'Member Email',
                accessor: 'memberEmail',
            },
            {
                Header: 'Member Login ID',
                accessor: 'memberLoginId',
            },
            {
                Header: 'Zip Code',
                accessor: 'zipCode',
            },
            {
                Header: 'Member Address',
                accessor: 'memberAddress',
            },
            {
                Header: 'Member Detail Address',
                accessor: 'memberDetailAddress',
            },
            {
                Header: 'Role',
                accessor: 'role',
            },
            {
                Header: 'Created At',
                accessor: 'createdAt',
            },
            {
                Header: 'Modified At',
                accessor: 'modifiedAt',
            },
        ]
    )
} 