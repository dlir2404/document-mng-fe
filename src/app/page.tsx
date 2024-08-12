'use client'
import { useState } from "react";
import { useAppContext } from "./app-provider";
import { CookieKeys } from "../../shared/constants/cookie";
import { useRouter } from "next/navigation";
import { Button, notification, Radio, Table, Tag } from "antd";
import { useTabsContext } from "../../shared/components/layouts/MainLayout";
import { DOCUMENT_STATUS, OPTIONS } from "../../shared/constants/tabs";
import { useGetListDocument } from "../../shared/services/document";
import { incomeAttribute } from "../../shared/constants/attribute";
import { formatDate } from "../../shared/utils/formatDate";
import Link from "next/link";
import { handlePdfLink } from "../../shared/utils/handlePdfLink";
import Image from "next/image";
import UploadIncomeModal from "../../shared/components/modals/upload-income-modal";
import { useGetProfile } from "../../shared/services/user";
import PresentToLeaderModal from "../../shared/components/modals/present-to-leader";
import RequestProcessIncome from "../../shared/components/modals/request-process-income";
import AcceptProcessIncome from "../../shared/components/modals/accept-process-income";

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
  const [documentId, setDocumentId] = useState()
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false)
  const [isPresentModalOpen, setIsPresentModalOpen] = useState(false)
  const [isRequestProccessIncome, setIsRequestProccessIncome] = useState(false)
  const [isAcceptProccessIncome, setIsAcceptProccessIncome] = useState(false)
  const [status, setStatus] = useState<string[] | undefined>()

  useGetProfile(appContext.token, (user: any) => {
    appContext.setUser(user)
  }, () => {
    notification.error({
      message: "Phiên đăng nhập đã hết hạn"
    })
    router.push('/login')
  })

  const handleChangeTab = (event: any) => {
    setStatus(event.target.value)
  }

  const handleShowAction = (status: string, role: number, record: any) => {
    switch (role) {
      case 2: //leader
        if (status === 'PRESENTED_TO_LEADER') {
          return (
            <Button onClick={() => {
              setDocumentId(record.id)
              setIsRequestProccessIncome(true)
            }}>Giao xử lý</Button>
          )
        }
        if (status === 'WAITING_FOR_APPROVING_DRAFT') {
          return (
            <div>
              <Button type="primary" className="mb-4 mr-4">Duyệt dự thảo</Button>
              <Button>Không phê duyệt</Button>
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
                  setDocumentId(record.id)
                  setIsAcceptProccessIncome(true)
                }}
              >Tiếp nhận</Button>
              <Button>Trả lại lãnh đạo</Button>
            </div>
          )
        }
        if (status === 'PROCESSING') {
          return (
            <Button>Hoàn thành xử lý</Button>
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
                  setDocumentId(record.id)
                }}
                className="mb-4 mr-4"
              >Trình lãnh đạo</Button>
              <Button>Xóa văn bản</Button>
            </div>
          )
        }
        return (<p className="w-full text-center">--</p>)
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
    status: status
  }, appContext.token)

  const columns = [
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
      title: incomeAttribute['status'],
      dataIndex: 'status',
      key: 'status',
      render: (value: string) => {
        return <Tag color={DOCUMENT_STATUS[exchangeRoleName(appContext.user?.role)].INCOME[value].color}>{DOCUMENT_STATUS[exchangeRoleName(appContext.user?.role)].INCOME[value].status}</Tag>
      }
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
      title: 'Hành động',
      dataIndex: 'status',
      key: 'action',
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

  return (
    <>
      <div>
        <Button className="mr-4" onClick={() => setIsIncomeModalOpen(true)}>Upload</Button>
        <Radio.Group
          options={options}
          onChange={handleChangeTab}
          value={status}
          optionType="button"
          buttonStyle="solid"
          className="mb-4"
        />
        <Table
          loading={isLoading}
          columns={columns}
          bordered
          dataSource={data?.rows.map((row: any, index: number) => { return { key: index + 1, ...row } }) || []}
        />
      </div>
      <UploadIncomeModal onOk={() => { refetch() }} isOpen={isIncomeModalOpen} setIsOpen={setIsIncomeModalOpen}></UploadIncomeModal>
      <PresentToLeaderModal documentId={documentId} onOk={() => { refetch() }} isOpen={isPresentModalOpen} setIsOpen={setIsPresentModalOpen}></PresentToLeaderModal>
      <RequestProcessIncome documentId={documentId} onOk={() => { refetch() }} isOpen={isRequestProccessIncome} setIsOpen={setIsRequestProccessIncome}></RequestProcessIncome>
      <AcceptProcessIncome documentId={documentId} onOk={() => { refetch() }} isOpen={isAcceptProccessIncome} setIsOpen={setIsAcceptProccessIncome}></AcceptProcessIncome>
    </>
  );
}
