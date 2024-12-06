export function loginSearchColumn() {
    return (
        [
            {
                Header: 'Log ID',
                accessor: 'logId',
            },
            {
                Header: 'Trace ID',
                accessor: 'traceId',
            },
            {
                Header: 'Log Type',
                accessor: 'logType',
            },
            {
                Header: 'Message',
                accessor: 'message',
            },
            {
                Header: 'Member ID',
                accessor: 'memberId',
            },
            {
                Header: 'Status',
                accessor: 'status',
            },
            {
                Header: 'Request URI',
                accessor: 'requestUri',
            },
            {
                Header: 'Created At',
                accessor: 'createdAt',
            },
        ]
    )
} 