import { Sidebar } from "@/components/sidebar";
import { getSession } from "@/lib/session";

export default async function AuthLayout({
  children,
  isStudent = false,
}: Readonly<{
  children: React.ReactNode;
  isStudent?: boolean;
}>) {
  const session = await getSession();

  if (session) {
    return (
      <>
        <Sidebar isStudent={isStudent} session={session} />
        <main className="mt-14 sm:ml-[270px] sm:mt-3 relative mb-5">
          <section className="mx-[20px] md:mx-[30px] min-h-[calc(100vh_-_106px)] mt-2 relative pb-14">
            {children}
          </section>
        </main>
      </>
    );
  }
}
