'use client'
import { useEffect } from "react";
import { useAppContext } from "./app-provider";
import { CookieKeys } from "../../shared/constants/cookie";
import { useRouter } from "next/navigation";
import { notification, Radio } from "antd";
import { useTabsContext } from "../../shared/components/layouts/MainLayout";
import { OPTIONS } from "../../shared/constants/tabs";

export default function Home() {
  const router = useRouter()
  const appContext = useAppContext()
  const tabsContext = useTabsContext()

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
  }

  return (
    <div>
      <Radio.Group
        options={options}
        onChange={handleChangeTab}
        // value={value4}
        optionType="button"
        buttonStyle="solid"
      />
    </div>
  );
}
