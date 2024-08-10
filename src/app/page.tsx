'use client'
import { useEffect, useState } from "react";
import { useAppContext } from "./app-provider";
import { CookieKeys } from "../../shared/constants/cookie";
import { useRouter } from "next/navigation";
import { Button, notification, Radio, Table } from "antd";
import { useTabsContext } from "../../shared/components/layouts/MainLayout";
import { OPTIONS } from "../../shared/constants/tabs";
import { useGetListDocument } from "../../shared/services/document";
import { incomeAttribute } from "../../shared/constants/attribute";
import { formatDate } from "../../shared/utils/formatDate";
import Link from "next/link";
import { handlePdfLink } from "../../shared/utils/handlePdfLink";
import Image from "next/image";
import UploadIncomeModal from "../../shared/components/modals/upload-income-modal";

export default function Home() {
  const router = useRouter()
  const appContext = useAppContext()
  const tabsContext = useTabsContext()
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false)
  const [status, setStatus] = useState<string[] | undefined>()

  useEffect(() => {
    if (!appContext.user && !localStorage.getItem(CookieKeys.accessToken)) {
      router.push('/login')
      notification.error({
        message: "Phiên đăng nhập đã hết hạn"
      })
    }
  }, [])

  const handleChangeTab = () => {

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
          // value={value4}
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
    </>
  );
}
