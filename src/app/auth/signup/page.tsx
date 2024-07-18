"use client";

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
import * as z from "zod";
import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createdAccount } from "@/actions/users";

const formSchema = z.object({
  fullname: z.string().min(6),
  nim: z.string().min(8),
  email: z.string().email(),
  gender: z.string(),
  password: z.string().min(8),
  address: z.string().min(8),
});

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      nim: "",
      email: "",
      gender: "",
      password: "",
      address: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const loading = toast.loading("submitting...");
      const created = await createdAccount(values);

      if (created?.message) {
        toast.dismiss(loading);
        toast.success(created.message);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <main className="text-foreground/80 relative py-5 flex flex-col items-center md:py-0 md:justify-center md:h-screen h-full">
      <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <section className="space-y-5">
        <Card className="w-full md:w-[570px] border-t-blue-400 border-t-4 shadow-lg">
          <CardHeader>
            <CardTitle className="mb-2">
              <p className="text-sm text-gray-500 mb-4 md:mb-7 font-normal tracking-wide">
                <Link className="text-blue-600" href="/">
                  Home
                </Link>{" "}
                / Register
              </p>
              <p>Register</p>
            </CardTitle>
            <CardDescription>
              Register yourself to do something on lLMS.
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-4"
            >
              <CardContent className="space-y-7 md:mt-3">
                <div className="w-full flex items-center gap-5 flex-col md:flex-row">
                  <FormField
                    control={form.control}
                    name="fullname"
                    render={({ field }) => (
                      <FormItem className="w-1/2 items-center">
                        <FormLabel className="text-xs">Full name</FormLabel>
                        <FormControl>
                          <Input
                            className="text-xs"
                            placeholder="e.g. jhon doe"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="nim"
                    render={({ field }) => (
                      <FormItem className="w-1/2 items-center">
                        <FormLabel className="text-xs">NIM</FormLabel>
                        <FormControl>
                          <Input
                            className="text-xs"
                            placeholder="e.g. 43320004"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full flex items-center gap-5 flex-col md:flex-row">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="w-1/2 items-center">
                        <FormLabel className="text-xs">Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            className="text-xs"
                            placeholder="e.g. jhon doe@gmail.com"
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
                      <FormItem className="w-1/2 items-center">
                        <FormLabel className="text-xs">Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            className="text-xs"
                            placeholder="e.g. ******"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full flex items-center gap-5 flex-col md:flex-row">
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem className="w-1/2 items-center">
                        <FormLabel className="text-xs">Gender</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">male</SelectItem>
                            <SelectItem value="female">female</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="w-1/2 items-center">
                        <FormLabel className="text-xs">Address</FormLabel>
                        <FormControl>
                          <Input
                            className="text-xs"
                            placeholder="e.g. Tembalang City"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start space-y-3 md:mt-3">
                <Button className="w-full" type="submit">
                  Register
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
        <div className="space-y-10">
          <p className="text-center text-sm">
            Already Have an account?{" "}
            <Link
              href="/auth/signin"
              className="underline capitalize text-blue-600"
            >
              login!
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
