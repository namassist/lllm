"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const handlePopState = () => {
      alert(
        "Tidak bisa kembali ke halaman sebelumnya selama ujian berlangsung."
      );
    };

    window.history.pushState(null, null, window.location.href);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [router]);

  return (
    <div>
      <h1>Halaman Ujian</h1>
      {/* Tambahkan komponen ujian di sini */}
    </div>
  );
}
