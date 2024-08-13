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
            {
                label: 'Tra cứu',
                value: undefined
            },
            {
                label: 'Dự thảo văn bản đi',
                value: ['WAITING_FOR_ASSIGNMENT']
            },
            {
                label: 'Đã giao giải quyết',
                value: ['ASSIGNMENT_FOR_PROCESS', 'PROCESSING', 'WAITING_FOR_APPROVE', 'APPROVED', 'PUBLISHED']
            },
            {
                label: 'Chờ phê duyệt',
                value: ['WAITING_FOR_APPROVE']
            },
            {
                label: 'Đã phê duyệt',
                value: ['APPROVED', 'PUBLISHED']
            }
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
        GOING: [
            {
                label: 'Tra cứu',
                value: undefined
            },
            {
                label: 'Chờ tiếp nhận',
                value: ['ASSIGNMENT_FOR_PROCESS']
            },
            {
                label: 'Đang giải quyết',
                value: ['PROCESSING']
            },
            {
                label: 'Đã giải quyết',
                value: ['WAITING_FOR_APPROVE', 'APPROVED', 'PUBLISHED']
            }
        ]
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
        GOING: [
            {
                label: 'Tra cứu',
                value: undefined
            },
            {
                label: 'Chờ phát hành',
                value: ['APPROVED']
            },
            {
                label: 'Đã phát hành',
                value: ['PUBLISHED']
            }
        ]
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
            WAITING_FOR_ASSIGNMENT: {
                status: 'Chờ giao giải quyết',
                color: 'warning'
            },
            ASSIGNMENT_FOR_PROCESS: {
                status: 'Đã giao giải quyết',
                color: 'lime'
            },
            PROCESSING: {
                status: 'Đã giao giải quyết',
                color: 'lime'
            },
            WAITING_FOR_APPROVE: {
                status: 'Chờ phê duyệt',
                color: 'orange'
            },
            APPROVED: {
                status: 'Đã phê duyệt',
                color: 'success'
            },
            PUBLISHED: {
                status: 'Đã phê duyệt',
                color: 'success'
            }
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
            WAITING_FOR_ASSIGNMENT: {
                status: 'Chờ giao giải quyết',
                color: 'default'
            },
            ASSIGNMENT_FOR_PROCESS: {
                status: 'Chờ tiếp nhận',
                color: 'warning'
            },
            PROCESSING: {
                status: 'Đang giải quyết',
                color: 'processing'
            },
            WAITING_FOR_APPROVE: {
                status: 'Đã giải quyết',
                color: 'success'
            },
            APPROVED: {
                status: 'Đã giải quyết',
                color: 'success'
            },
            PUBLISHED: {
                status: 'Đã giải quyết',
                color: 'success'
            }
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
            WAITING_FOR_ASSIGNMENT: {
                status: 'Chờ giao giải quyết',
                color: 'default'
            },
            ASSIGNMENT_FOR_PROCESS: {
                status: 'Chờ tiếp nhận',
                color: 'orange'
            },
            PROCESSING: {
                status: 'Đang giải quyết',
                color: 'processing'
            },
            WAITING_FOR_APPROVE: {
                status: 'Chờ tiếp nhận',
                color: 'lime'
            },
            APPROVED: {
                status: 'Chờ phát hành',
                color: 'warning'
            },
            PUBLISHED: {
                status: 'Đã phát hành',
                color: 'success'
            }
        }
    }
}