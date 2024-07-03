import AuthLayout from "@/components/layouts/AuthLayout";
import { getSession } from "@/lib/session";

export default async function Page() {
  const session = await getSession();

  return (
    <AuthLayout isStudent>
      <h1>Welcome {session?.name}</h1>
    </AuthLayout>
  );
}
