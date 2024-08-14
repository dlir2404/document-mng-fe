'use client'
import { useEffect, useState } from "react";
import { useAppContext } from "./app-provider";
import { useRouter } from "next/navigation";
import { Button, Input, notification, Radio, Table, Tag } from "antd";
import { useTabsContext } from "../../shared/components/layouts/MainLayout";
import { DOCUMENT_STATUS, OPTIONS } from "../../shared/constants/tabs";
import { useGetListDocument } from "../../shared/services/document";
import { goingAttribute, incomeAttribute } from "../../shared/constants/attribute";
import { formatDate } from "../../shared/utils/formatDate";
import Link from "next/link";
import { handlePdfLink } from "../../shared/utils/handlePdfLink";
import Image from "next/image";
import UploadIncomeModal from "../../shared/components/modals/upload-income-modal";
import { useGetProfile } from "../../shared/services/user";
import PresentToLeaderModal from "../../shared/components/modals/present-to-leader";
import RequestProcessIncome from "../../shared/components/modals/request-process-income";
import AcceptProcessIncome from "../../shared/components/modals/accept-process-income";
import DenyProcessIncome from "../../shared/components/modals/deny-process-income";
import CompleteProcess from "../../shared/components/modals/complete-process";
import DeleteIncome from "../../shared/components/modals/delete-income";
import AcceptDraft from "../../shared/components/modals/accept-draft";
import DenyDraft from "../../shared/components/modals/deny-draft";
import RequestProcessGoing from "../../shared/components/modals/request-process-going";
import AcceptProcessGoing from "../../shared/components/modals/accept-process-going";
import DenyProcessGoing from "../../shared/components/modals/deny-process-going";
import CompleteProcessGoing from "../../shared/components/modals/complete-process-going";
import AcceptGoingDocument from "../../shared/components/modals/accept-going-document";
import PublishGoingDocument from "../../shared/components/modals/publish-going-document";
import DocumentDetail from "../../shared/components/modals/document-detail";
import { debounce } from "lodash"
import { SearchOutlined } from "@ant-design/icons";

const exchangeRoleName = (role: number): string => {
  switch (role) {
    case 1: return 'ADMIN';
    case 2: return 'LEADER';
    case 3: return 'SPECIALIST';
    case 4: return 'OFFICE_CLERK';
    default: return 'SPECIALIST';
  }
}



export default function Home() {
  const router = useRouter()
  const appContext = useAppContext()
  const tabsContext = useTabsContext()
  const [document, setDocument] = useState<any>()
  const [detailModel, setDetailModal] = useState(false)

  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false)
  const [isPresentModalOpen, setIsPresentModalOpen] = useState(false)
  const [isRequestProccessIncome, setIsRequestProccessIncome] = useState(false)
  const [isAcceptProccessIncome, setIsAcceptProccessIncome] = useState(false)
  const [isDenyProccessIncome, setIsDenyProccessIncome] = useState(false)
  const [isCompleteProccessIncome, setIsCompleteProccessIncome] = useState(false)
  const [isDeleteProccessIncome, setIsDeleteProccessIncome] = useState(false)
  const [isAcceptDraft, setIsAcceptDraft] = useState(false)
  const [isDenyDraft, setIsDenyDraft] = useState(false)

  const [isRequestProccessGoing, setIsRequestProccessGoing] = useState(false)
  const [isAcceptProccessGoing, setIsAcceptProccessGoing] = useState(false)
  const [isDenyProccessGoing, setIsDenyProccessGoing] = useState(false)
  const [isCompleteProccessGoing, setIsCompleteProccessGoing] = useState(false)
  const [isAcceptGoing, setIsAcceptGoing] = useState(false)
  const [isPublishGoing, setIsPublishGoing] = useState(false)

  const [isUploadBtn, setIsUploadBtn] = useState(true)
  const [status, setStatus] = useState<string[] | undefined>()
  const [query, setQuery] = useState()

  useGetProfile(appContext.token, (user: any) => {
    appContext.setUser(user)
  }, () => {
    notification.error({
      message: "Phiên đăng nhập đã hết hạn"
    })
    router.push('/login')
  })

  useEffect(() => {
    if ([2, 3].includes(appContext.user?.role) && tabsContext.tabKey === 'income-document') {
      setIsUploadBtn(false)
    } else {
      setIsUploadBtn(true)
    }
  }, [appContext.user, tabsContext.tabKey])

  const handleChangeTab = (event: any) => {
    setStatus(event.target.value)
  }

  const handleShowAction = (status: string, role: number, record: any) => {
    if (tabsContext.tabKey === 'income-document') {
      switch (role) {
        case 2: //leader
          if (status === 'PRESENTED_TO_LEADER') {
            return (
              <Button onClick={() => {
                setDocument(record)
                setIsRequestProccessIncome(true)
              }}>Giao xử lý</Button>
            )
          }
          if (status === 'WAITING_FOR_APPROVING_DRAFT') {
            return (
              <div>
                <Button
                  type="primary"
                  className="mb-4 mr-4"
                  onClick={() => {
                    setDocument(record)
                    setIsAcceptDraft(true)
                  }}
                >Duyệt dự thảo</Button>
                <Button
                  onClick={() => {
                    setDocument(record)
                    setIsDenyDraft(true)
                  }}
                >Không phê duyệt</Button>
              </div>
            )
          }
          return (<p className="w-full text-center">--</p>)
        case 3: //specialist
          if (status === 'ASSIGNED_FOR_PROCESS') {
            return (
              <div>
                <Button type="primary" className="mb-4 mr-4"
                  onClick={() => {
                    setDocument(record)
                    setIsAcceptProccessIncome(true)
                  }}
                >Tiếp nhận</Button>
                <Button
                  onClick={() => {
                    setDocument(record)
                    setIsDenyProccessIncome(true)
                  }}
                >Trả lại lãnh đạo</Button>
              </div>
            )
          }
          if (status === 'PROCESSING') {
            return (
              <Button
                onClick={() => {
                  setDocument(record)
                  setIsCompleteProccessIncome(true)
                }}
              >Hoàn thành xử lý
              </Button>
            )
          }
          return (<p className="w-full text-center">--</p>)
        case 4: //office_clerk
          if (status === 'WAITING_FOR_PRESENTING_TO_LEADER') {
            return (
              <div>
                <Button
                  onClick={() => {
                    setIsPresentModalOpen(true)
                    setDocument(record)
                  }}
                  className="mb-4 mr-4"
                >Trình lãnh đạo</Button>
                <Button danger
                  onClick={() => {
                    setDocument(record)
                    setIsDeleteProccessIncome(true)
                  }}
                >Xóa văn bản</Button>
              </div>
            )
          }
          return (<p className="w-full text-center">--</p>)
      }
    } else {
      switch (role) {
        case 2: //leader
          if (status === 'WAITING_FOR_ASSIGNMENT') {
            return (
              <Button onClick={() => {
                setDocument(record)
                setIsRequestProccessGoing(true)
              }}>Giao chuyên viên giải quyết</Button>
            )
          }
          if (status === 'WAITING_FOR_APPROVE') {
            return (
              <div>
                <Button
                  type="primary"
                  className="mb-4 mr-4"
                  onClick={() => {
                    setDocument(record)
                    setIsAcceptGoing(true)
                  }}
                >Phê duyệt</Button>
                <Button
                  onClick={() => {
                    setDocument(record)
                  }}
                >Không phê duyệt</Button>
              </div>
            )
          }
          return (<p className="w-full text-center">--</p>)
        case 3: //specialist
          if (status === 'ASSIGNMENT_FOR_PROCESS') {
            return (
              <div>
                <Button type="primary" className="mb-4 mr-4"
                  onClick={() => {
                    setDocument(record)
                    setIsAcceptProccessGoing(true)
                  }}
                >Tiếp nhận</Button>
                <Button
                  onClick={() => {
                    setDocument(record)
                    setIsDenyProccessGoing(true)
                  }}
                >Trả lại lãnh đạo</Button>
              </div>
            )
          }
          if (status === 'PROCESSING') {
            return (
              <Button
                onClick={() => {
                  setDocument(record)
                  setIsCompleteProccessGoing(true)
                }}
              >Hoàn thành giải quyết
              </Button>
            )
          }
          return (<p className="w-full text-center">--</p>)
        case 4: //office_clerk
          if (status === 'APPROVED') {
            return (
              <div>
                <Button
                  onClick={() => {
                    setDocument(record)
                    setIsPublishGoing(true)
                  }}
                  className="mb-4 mr-4"
                >Phát hành văn bản đi</Button>
              </div>
            )
          }
          return (<p className="w-full text-center">--</p>)
      }
    }
  }

  let options: any[] = []
  switch (appContext.user?.role) {
    case 2:
      options = OPTIONS['LEADER'][tabsContext.tabKey === 'income-document' ? "INCOME" : "GOING"]
      break;
    case 3:
      options = OPTIONS['SPECIALIST'][tabsContext.tabKey === 'income-document' ? "INCOME" : "GOING"]
      break;
    case 4:
      options = OPTIONS['OFFICE_CLERK'][tabsContext.tabKey === 'income-document' ? "INCOME" : "GOING"]
      break;
  }

  const { data, refetch, isLoading } = useGetListDocument({
    type: tabsContext.tabKey,
    status: status,
    query: query
  }, appContext.token)

  const columnsIncome = [
    {
      title: incomeAttribute['id'],
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: incomeAttribute['number'],
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: incomeAttribute['arrivalDate'],
      dataIndex: 'arrivalDate',
      key: 'arrivalDate',
      render: (value: string) => <p>{formatDate(value)}</p>
    },
    {
      title: incomeAttribute['signDate'],
      dataIndex: 'signDate',
      key: 'signDate',
      render: (value: string) => <p>{formatDate(value)}</p>
    },
    {
      title: incomeAttribute['abstract'],
      dataIndex: 'abstract',
      key: 'abstract',
    },
    {
      title: incomeAttribute['sendFrom'],
      dataIndex: 'sendFrom',
      key: 'sendFrom',
    },
    {
      title: incomeAttribute['mainProcessor'],
      dataIndex: 'mainProcessor',
      key: 'mainProcessor',
      render: (value: any) => <p>{value?.username}</p>
    },
    {
      title: 'Phối hợp xử lý',
      // dataIndex: 'arrivalDate',
      // key: 'arrivalDate',
    },
    {
      title: incomeAttribute['deadline'],
      dataIndex: 'deadline',
      key: 'deadline',
      render: (value: string) => <p>{formatDate(value)}</p>
    },
    {
      title: incomeAttribute['status'],
      dataIndex: 'status',
      key: 'status',
      render: (value: string) => {
        return <Tag color={DOCUMENT_STATUS[exchangeRoleName(appContext.user?.role)].INCOME[value].color}>{DOCUMENT_STATUS[exchangeRoleName(appContext.user?.role)].INCOME[value].status}</Tag>
      }
    },
    {
      title: 'Hành động',
      dataIndex: 'status',
      key: 'action',
      onCell: () => {
        return {
          onClick: (e: any) => {
            e.stopPropagation();
          },
        };
      },
      render: (status: string, record: any) => {
        return handleShowAction(status, appContext.user?.role, record)
      }
    },
    {
      title: incomeAttribute['incomeUrl'],
      dataIndex: 'incomeUrl',
      key: 'incomeUrl',
      render: (value: any) => {
        if (value && value !== "") {
          return (
            <Link target="_blank" href={handlePdfLink(value)}>
              <Image width={24} height={24} alt="pdf" src="/pdf-icon.png" />
            </Link>
          )
        }
        return ''
      }
    },
    {
      title: incomeAttribute['draftUrl'],
      dataIndex: 'draftUrl',
      key: 'draftUrl',
      render: (value: any) => {
        if (value && value !== "") {
          return (
            <Link target="_blank" href={handlePdfLink(value)}>
              <Image width={24} height={24} alt="pdf" src="/pdf-icon.png" />
            </Link>
          )
        }
        return ''
      }
    },
  ];

  const columnsGoing = [
    {
      title: goingAttribute['id'],
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: goingAttribute['number'],
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: goingAttribute['signDate'],
      dataIndex: 'signDate',
      key: 'signDate',
      render: (value: string) => {
        if (!value) return ''
        return <p>{formatDate(value)}</p>
      }
    },
    {
      title: goingAttribute['abstract'],
      dataIndex: 'abstract',
      key: 'abstract',
    },
    {
      title: goingAttribute['abstractDraft'],
      dataIndex: 'abstractDraft',
      key: 'abstractDraft',
    },
    {
      title: goingAttribute['sendFrom'],
      dataIndex: 'sendFrom',
      key: 'sendFrom',
    },
    {
      title: goingAttribute['mainProcessor'],
      dataIndex: 'mainProcessor',
      key: 'mainProcessor',
      render: (value: any) => <p>{value?.username}</p>
    },
    {
      title: goingAttribute['collaborators'],
      // dataIndex: 'arrivalDate',
      // key: 'arrivalDate',
    },
    {
      title: goingAttribute['deadline'],
      dataIndex: 'deadline',
      key: 'deadline',
      render: (value: string) => <p>{formatDate(value)}</p>
    },
    {
      title: goingAttribute['status'],
      dataIndex: 'status',
      key: 'status',
      render: (value: string) => {
        return <Tag color={DOCUMENT_STATUS[exchangeRoleName(appContext.user?.role)].GOING[value].color}>{DOCUMENT_STATUS[exchangeRoleName(appContext.user?.role)].GOING[value].status}</Tag>
      }
    },
    {
      title: 'Hành động',
      dataIndex: 'status',
      key: 'action',
      onCell: () => {
        return {
          onClick: (e: any) => {
            e.stopPropagation();
          },
        };
      },
      render: (status: string, record: any) => {
        return handleShowAction(status, appContext.user?.role, record)
      }
    },
    {
      title: goingAttribute['draftUrl'],
      dataIndex: 'draftUrl',
      key: 'draftUrl',
      render: (value: any) => {
        if (value && value !== "") {
          return (
            <Link target="_blank" href={handlePdfLink(value)}>
              <Image width={24} height={24} alt="pdf" src="/pdf-icon.png" />
            </Link>
          )
        }
        return ''
      }
    },
    {
      title: goingAttribute['goingUrl'],
      dataIndex: 'goingUrl',
      key: 'goingUrl',
      render: (value: any) => {
        if (value && value !== "") {
          return (
            <Link target="_blank" href={handlePdfLink(value)}>
              <Image width={24} height={24} alt="pdf" src="/pdf-icon.png" />
            </Link>
          )
        }
        return ''
      }
    },
  ]

  return (
    <>
      <div>
        {isUploadBtn && (<Button className="mr-4" onClick={() => setIsIncomeModalOpen(true)}>Upload</Button>)}
        <Radio.Group
          options={options}
          onChange={handleChangeTab}
          value={status}
          optionType="button"
          buttonStyle="solid"
          className="mb-4"
        />
        <div className="inline-block float-right">
          <Input
            onChange={debounce((e) => setQuery(e.currentTarget.value), 300)}
            placeholder="Nhập từ khoá"
            className="min-w-[400px]"
            allowClear
            prefix={<SearchOutlined />} />
        </div>
        <Table
          loading={isLoading}
          columns={tabsContext.tabKey === 'income-document' ? columnsIncome : tabsContext.tabKey === 'going-document' ? columnsGoing : []}
          bordered
          onRow={(record) => {
            return {
              onClick: () => {
                setDocument(record)
                setDetailModal(true)
              }
            }
          }}
          dataSource={data?.rows.map((row: any, index: number) => { return { key: index + 1, ...row } }) || []}
        />
      </div>
      {document?.id && detailModel && (
        <DocumentDetail document={document} isOpen={detailModel} setIsOpen={setDetailModal}></DocumentDetail>
      )}

      <UploadIncomeModal onOk={() => { refetch() }} isOpen={isIncomeModalOpen} setIsOpen={setIsIncomeModalOpen}></UploadIncomeModal>
      <PresentToLeaderModal documentId={document?.id} onOk={() => { refetch() }} isOpen={isPresentModalOpen} setIsOpen={setIsPresentModalOpen}></PresentToLeaderModal>
      <RequestProcessIncome documentId={document?.id} onOk={() => { refetch() }} isOpen={isRequestProccessIncome} setIsOpen={setIsRequestProccessIncome}></RequestProcessIncome>
      <AcceptProcessIncome documentId={document?.id} onOk={() => { refetch() }} isOpen={isAcceptProccessIncome} setIsOpen={setIsAcceptProccessIncome}></AcceptProcessIncome>
      <DenyProcessIncome documentId={document?.id} onOk={() => { refetch() }} isOpen={isDenyProccessIncome} setIsOpen={setIsDenyProccessIncome}></DenyProcessIncome>
      <CompleteProcess documentId={document?.id} onOk={() => { refetch() }} isOpen={isCompleteProccessIncome} setIsOpen={setIsCompleteProccessIncome}></CompleteProcess>
      <DeleteIncome documentId={document?.id} onOk={() => { refetch() }} isOpen={isDeleteProccessIncome} setIsOpen={setIsDeleteProccessIncome}></DeleteIncome>
      <AcceptDraft documentId={document?.id} onOk={() => { refetch() }} isOpen={isAcceptDraft} setIsOpen={setIsAcceptDraft}></AcceptDraft>
      <DenyDraft documentId={document?.id} onOk={() => { refetch() }} isOpen={isDenyDraft} setIsOpen={setIsDenyDraft}></DenyDraft>

      <RequestProcessGoing documentId={document?.id} onOk={() => { refetch() }} isOpen={isRequestProccessGoing} setIsOpen={setIsRequestProccessGoing}></RequestProcessGoing>
      <AcceptProcessGoing documentId={document?.id} onOk={() => { refetch() }} isOpen={isAcceptProccessGoing} setIsOpen={setIsAcceptProccessGoing}></AcceptProcessGoing>
      <DenyProcessGoing documentId={document?.id} onOk={() => { refetch() }} isOpen={isDenyProccessGoing} setIsOpen={setIsDenyProccessGoing}></DenyProcessGoing>
      <CompleteProcessGoing documentId={document?.id} onOk={() => { refetch() }} isOpen={isCompleteProccessGoing} setIsOpen={setIsCompleteProccessGoing}></CompleteProcessGoing>
      <AcceptGoingDocument documentId={document?.id} onOk={() => { refetch() }} isOpen={isAcceptGoing} setIsOpen={setIsAcceptGoing}></AcceptGoingDocument>
      <PublishGoingDocument documentId={document?.id} onOk={() => { refetch() }} isOpen={isPublishGoing} setIsOpen={setIsPublishGoing}></PublishGoingDocument>
    </>
  );
}
