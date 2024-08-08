'use client'
import { useEffect } from "react";
import { useAppContext } from "./app-provider";
import { CookieKeys } from "../../shared/constants/cookie";
import { useRouter } from "next/navigation";
import { notification } from "antd";

export default function Home() {
  const router = useRouter()
  const appContext = useAppContext()

  useEffect(() => {
    if (!appContext.user && !localStorage.getItem(CookieKeys.accessToken)) {
      router.push('/login')
      notification.error({
        message: "Phiên đăng nhập đã hết hạn"
      })
    }
  })

  return (
    <h2>Hello {appContext.user?.username}</h2>
  );
}
