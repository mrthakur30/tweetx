"use client"

import { currentUserState } from "@/atoms/user";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";

export default function Home() {
  const [user, setUser] = useRecoilState(currentUserState);
  const router = useRouter();

  if(user==null){
      router.push('/login')
      return ;
  }

  router.push('/feed');
  return ;
}
