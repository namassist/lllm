import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Sidebar />
      <main className="mt-14 sm:ml-[270px] sm:mt-3 relative mb-5">
        <Header />
        <section className="mx-[20px] md:mx-[30px] min-h-[calc(100vh_-_106px)] mt-2 relative pb-14">
          {children}
        </section>
      </main>
    </>
  );
}
