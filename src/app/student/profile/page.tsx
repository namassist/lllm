import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import AuthLayout from "@/components/layouts/AuthLayout";

export default async function Page() {
  const session = await getServerSession(authOptions);
  return (
    <AuthLayout isStudent>
      <h1>Welcome {session?.user?.username}</h1>
    </AuthLayout>
  );
}
