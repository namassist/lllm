import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Signout from "@/components/signout";
import AuthLayout from "@/components/layouts/AuthLayout";

export default async function Page() {
  const session = await getServerSession(authOptions);
  return (
    <AuthLayout>
      <h1>Welcome {session?.user?.username}</h1>
      <Signout />
    </AuthLayout>
  );
}
