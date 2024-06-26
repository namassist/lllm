"use client";

import * as z from "zod";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession, signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
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

export default function Login() {
  const { toast } = useToast();
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
        toast({
          variant: "destructive",
          title: `Error ${signInData?.status}`,
          description: `${signInData?.error}`,
        });
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    } finally {
      const session = await getSession();
      session?.user?.role === "admin"
        ? router.push("/admin/dashboard")
        : router.push("/dashboard");

      setIsLoading(false);
      if (session) {
        toast({
          title: `Berhasil Login!`,
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="relative w-3/12">
        <div className="w-full p-6 bg-white rounded-lg shadow-lg">
          <div className="flex justify-center items-center mt-3 mb-8 gap-4">
            <h1 className="text-xl font-semibold text-gray-500 text-center uppercase">
              SIGN-IN
            </h1>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-4"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Username</FormLabel>
                    <FormControl>
                      <Input
                        className="text-xs"
                        placeholder="Masukkan username"
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
              {isLoading ? (
                <Button className="w-full" size="sm" disabled>
                  Segera datang
                </Button>
              ) : (
                <Button type="submit" size="sm" className="w-full">
                  Masuk
                </Button>
              )}
            </form>
          </Form>
          <p className="text-xs text-gray-500 text-center mt-10 capitalize">
            &copy;2024 | Build by IMOET
          </p>
        </div>
      </div>
    </div>
  );
}
