export const OPTIONS = {
    LEADER: {
        INCOME: [
            {
                label: 'Tra cứu',
                value: ''
            },
            {
                label: 'Chờ giao xử lý',
                value: 'PRESENTED_TO_LEADER'
            },
            {
                label: 'Đã giao xử lý',
                value: 'ASSIGNED_FOR_PROCESS'
            },
            {
                label: 'Chờ phê duyệt',
                value: 'WAITING_FOR_APPROVING_DRAFT'
            },
            {
                label: 'Đã phê duyệt',
                value: 'APPROVED_DRAFT'
            }
        ],
        GOING: [

        ]
    },
    SPECIALIST: {
        INCOME: [
            {
                label: 'Tra cứu',
                value: ''
            },
            {
                label: 'Chờ tiếp nhận',
                value: 'ASSIGNED_FOR_PROCESS'
            },
            {
                label: 'Đang xử lý',
                value: 'PROCESSING'
            },
            {
                label: 'Đã xử lý',
                value: 'WAITING_FOR_APPROVING_DRAFT'
            }
        ],
        GOING: []
    },
    OFFICE_CLERK: {
        INCOME: [
            {
                label: 'Tra cứu',
                value: ''
            },
            {
                label: 'Chờ trình lãnh đạo',
                value: 'WAITING_FOR_PRESENTING_TO_LEADER'
            },
            {
                label: 'Đã trình lãnh đạo',
                value: 'PRESENTED_TO_LEADER'
            }
        ],
        GOING: []
    }
}