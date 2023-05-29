"use client";

import { useProgressBar } from "@/redux/hooks/useProgressBar";
import { useTheme } from "@/redux/hooks/useTheme";
import { useSession, signIn } from "next-auth/react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";
import { moviebunkersAPI } from "@/lib/api/moviebunkers";
import { Pagination } from "../Pagination";

export default function ReduxTest() {
  const { incProgress20, incProgress, completeProgress, resetProgress } =
    useProgressBar();

  const router = useRouter();

  const { data: session } = useSession();

  const pathname = usePathname();
  // console.log(pathname);
  // router.push('/?counter=10', undefined, { shallow: true });

  // const pustCoutn = () => {
  //   router.push(pathname + "/?counter=10", undefined, { shallow: true });
  // };

  // moviebunkersAPI({ token: session?.auth?.token })
  //   .get(`/auth/who-am-i`)
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  return (
    <div>
      <Link href={"/admin?q1=123&q2=321"}>AdminPage</Link>
      <button onClick={() => pustCoutn()}>Push</button>

      <button onClick={() => incProgress20()}>Inc Pro 20</button>
      <button onClick={() => incProgress(10)}>Inc Pro Cust</button>
      <button onClick={() => completeProgress()}>Inc Pro Comp</button>
      <button onClick={() => resetProgress()}>Pro Reset</button>

      <Pagination currentPage={2} setPageNo={() => alert("pending")} total_pages={10} />
    </div>
  );
}
