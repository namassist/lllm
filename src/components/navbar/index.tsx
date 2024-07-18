import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const Navbar = async ({ isAuthenticated }: { isAuthenticated: any }) => {
  return (
    <nav className="py-5 h-20">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex gap-10 items-center">
            <Image src="/logo.svg" alt="logo" width={50} height={50} />
            <ul className="flex items-center gap-10">
              <Link href="/">
                <li className="text-[rgb(57,99,157)] font-semibold">Home</li>
              </Link>
              <Link href="#services">
                <li className="text-gray-400">Services</li>
              </Link>
              <Link href="#review">
                <li className="text-gray-400">Review</li>
              </Link>
              <Link href="#faq">
                <li className="text-gray-400">Faq</li>
              </Link>
            </ul>
          </div>
          {!isAuthenticated && (
            <Link href="/auth/signin">
              <Button variant="outline">Login</Button>
            </Link>
          )}
          {isAuthenticated && (
            <Link
              href={
                isAuthenticated?.role === "admin"
                  ? "/admin/dashboard"
                  : "/student/dashboard"
              }
            >
              <Button variant="outline">Dashboard</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
