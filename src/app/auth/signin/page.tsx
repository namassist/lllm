"use client";

import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession, signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  username: z.string().min(6),
  password: z.string().min(8),
});

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Check if user is already authenticated
  useEffect(() => {
    async function checkSession() {
      const session = await getSession();
      if (session) {
        router.push("/");
      }
    }
    checkSession();
  }, [router]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const signInData = await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: false,
      });

      if (!signInData?.ok) {
        toast.error(`${signInData?.status} ${signInData?.error}`);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      const session = await getSession();
      session?.user?.role === "admin"
        ? router.push("/admin/dashboard")
        : router.push("/student/dashboard");

      setIsLoading(false);
      if (session) {
        toast.success("Berhasil Login!");
      }
    }
  };

  return (
    <main className="text-foreground/80 relative py-5 flex flex-col items-center md:py-0 md:justify-center md:h-screen h-full">
      <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <section className="space-y-5">
        <Card className="w-full md:w-[450px] border-t-blue-400 border-t-4 shadow-lg">
          <CardHeader>
            <CardTitle className="mb-2">
              <p className="text-sm text-gray-500 mb-4 md:mb-7 font-normal tracking-wide">
                <Link className="text-blue-600" href="/">
                  Home
                </Link>
                / Login
              </p>
              <p></p>Login
            </CardTitle>
            <CardDescription>Input your username and password.</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-4"
            >
              <CardContent className="space-y-7 md:mt-3">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">
                        Username atau Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="text-xs"
                          placeholder="Masukkan username atau email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          className="text-xs"
                          placeholder="Masukkan password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="space-y-3">
                {isLoading ? (
                  <Button className="w-full" size="sm" disabled>
                    Submitting...
                  </Button>
                ) : (
                  <Button type="submit" size="sm" className="w-full">
                    Login
                  </Button>
                )}
              </CardFooter>
            </form>
          </Form>
        </Card>
        <div className="space-y-10">
          <p className="text-center text-sm">
            Dont Have an account?{" "}
            <Link
              href="/auth/signup"
              className="underline capitalize text-blue-600"
            >
              create one!
            </Link>
          </p>
          <p className="text-center text-sm">
            ©2024 lLMS. All rights reserved.
          </p>
        </div>
      </section>
    </main>
  );
}
