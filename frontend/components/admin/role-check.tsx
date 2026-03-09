"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RoleCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const roleId = localStorage.getItem("role_id");

    if (!roleId || (roleId !== "1" && roleId !== "3" && roleId !== "4")) {
      router.push("/");
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  if (!isAuthorized) {
    return null; // or a loading spinner
  }

  return <>{children}</>;
}
