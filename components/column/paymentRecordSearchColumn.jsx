export function paymentRecordSearchColumn() {
    return (
        [
            {
                Header: 'Payment Record ID',
                accessor: 'paymentRecordId',
            },
            {
                Header: 'Industry Type',
                accessor: 'industryType',
            },
            {
                Header: 'Business Registration Number',
                accessor: 'businessRegistrationNumber',
            },
            {
                Header: 'Total Payment Amount',
                accessor: 'totalPaymentAmount',
            },
            {
                Header: 'Card Sequence ID',
                accessor: 'cardSequenceId',
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