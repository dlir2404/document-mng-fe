export const OPTIONS = {
    LEADER: {
        INCOME: [
            {
                label: 'Tra cứu',
                value: undefined
            },
            {
                label: 'Chờ giao xử lý',
                value: ['PRESENTED_TO_LEADER']
            },
            {
                label: 'Đã giao xử lý',
                value: ['ASSIGNED_FOR_PROCESS', 'PROCESSING', 'WAITING_FOR_APPROVING_DRAFT', 'APPROVED_DRAFT']
            },
            {
                label: 'Chờ phê duyệt',
                value: ['WAITING_FOR_APPROVING_DRAFT']
            },
            {
                label: 'Đã phê duyệt',
                value: ['APPROVED_DRAFT']
            }
        ],
        GOING: [

        ]
    },
    SPECIALIST: {
        INCOME: [
            {
                label: 'Tra cứu',
                value: undefined
            },
            {
                label: 'Chờ tiếp nhận',
                value: ['ASSIGNED_FOR_PROCESS']
            },
            {
                label: 'Đang xử lý',
                value: ['PROCESSING']
            },
            {
                label: 'Đã xử lý',
                value: ['WAITING_FOR_APPROVING_DRAFT', 'APPROVED_DRAFT']
            }
        ],
        GOING: []
    },
    OFFICE_CLERK: {
        INCOME: [
            {
                label: 'Tra cứu',
                value: undefined
            },
            {
                label: 'Chờ trình lãnh đạo',
                value: ['WAITING_FOR_PRESENTING_TO_LEADER']
            },
            {
                label: 'Đã trình lãnh đạo',
                value: ['PRESENTED_TO_LEADER', 'ASSIGNED_FOR_PROCESS', 'PROCESSING', 'WAITING_FOR_APPROVING_DRAFT', 'APPROVED_DRAFT']
            }
        ],
        GOING: []
    }
}

export const DOCUMENT_STATUS: { [key: string]: any } = {
    LEADER: {
        INCOME: {
            WAITING_FOR_PRESENTING_TO_LEADER: {
                status: 'Chờ trình lãnh đạo',
                color: 'default'
            },
            PRESENTED_TO_LEADER: {
                status: 'Chờ giao xử lý',
                color: 'warning'
            },
            ASSIGNED_FOR_PROCESS: {
                status: 'Đã giao xử lý',
                color: 'lime'
            },
            PROCESSING: {
                status: 'Đã giao xử lý',
                color: 'lime'
            },
            WAITING_FOR_APPROVING_DRAFT: {
                status: 'Chờ phê duyệt',
                color: 'orange'
            },
            APPROVED_DRAFT: {
                status: 'Đã phê duyệt',
                color: 'success'
            }
        },
        GOING: {

        }
    },
    SPECIALIST: {
        INCOME: {
            WAITING_FOR_PRESENTING_TO_LEADER: {
                status: 'Chờ trình lãnh đạo',
                color: 'default'
            },
            PRESENTED_TO_LEADER: {
                status: 'Đã trình lãnh đạo',
                color: 'default'
            },
            ASSIGNED_FOR_PROCESS: {
                status: 'Chờ tiếp nhận',
                color: 'warning'
            },
            PROCESSING: {
                status: 'Đang xử lý',
                color: 'processing'
            },
            WAITING_FOR_APPROVING_DRAFT: {
                status: 'Đã xử lý',
                color: 'success'
            },
            APPROVED_DRAFT: {
                status: 'Đã xử lý',
                color: 'success'
            }
        },
        GOING: {

        }
    },
    OFFICE_CLERK: {
        INCOME: {
            WAITING_FOR_PRESENTING_TO_LEADER: {
                status: 'Chờ trình lãnh đạo',
                color: 'warning'
            },
            PRESENTED_TO_LEADER: {
                status: 'Đã trình lãnh đạo',
                color: 'success'
            },
            ASSIGNED_FOR_PROCESS: {
                status: 'Đã trình lãnh đạo',
                color: 'success'
            },
            PROCESSING: {
                status: 'Đã trình lãnh đạo',
                color: 'success'
            },
            WAITING_FOR_APPROVING_DRAFT: {
                status: 'Đã trình lãnh đạo',
                color: 'success'
            },
            APPROVED_DRAFT: {
                status: 'Đã trình lãnh đạo',
                color: 'success'
            }
        },
        GOING: {

        }
    }
}