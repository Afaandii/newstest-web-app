"use client";

import { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { 
  HiOutlineEye, 
  HiOutlineEyeSlash,
  HiOutlineArrowRightOnRectangle
} from "react-icons/hi2";
import { FaGithub, FaFacebookF } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    setIsLoading(true);
    console.log(values);
    setTimeout(() => {
      setIsLoading(false);
      alert("Login simulation: Check console for data");
    }, 1500);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#020617] text-white p-4 overflow-hidden [scrollbar-gutter:auto]">
      {/* Brand Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl font-bold tracking-tight">NewsTest Login</span>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-[450px] rounded-[12px] border border-white/10 bg-[#020817] p-6 shadow-2xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl text-center font-bold tracking-tight">Sign in</h1>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-200">Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="name@example.com" 
                      {...field} 
                      className="bg-[#020817] border-white/10 h-10 focus-visible:ring-1 focus-visible:ring-white/20"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-200">Password</FormLabel>
                    <Link 
                      href="/forgot-password" 
                      className="text-xs text-slate-400 hover:text-white transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="********" 
                        className="pr-10 bg-[#020817] border-white/10 h-10 focus-visible:ring-1 focus-visible:ring-white/20"
                        {...field} 
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                      >
                        {showPassword ? (
                          <HiOutlineEyeSlash className="size-4" />
                        ) : (
                          <HiOutlineEye className="size-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full bg-slate-100 text-[#020817] hover:bg-slate-200 h-10 font-bold tracking-tight rounded-[6px]"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="size-4 border-2 border-[#020817]/30 border-t-[#020817] rounded-full animate-spin" />
              ) : (
                <>
                  <HiOutlineArrowRightOnRectangle className="size-4 mr-2" />
                  Sign in
                </>
              )}
            </Button>
          </form>
        </Form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-white/5" />
          </div>
          <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest leading-none">
            <span className="bg-[#020817] px-3 text-slate-500">
              Or continue with
            </span>
          </div>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="w-full bg-transparent border-white/10 hover:bg-white/5 h-10 text-xs font-semibold rounded-[6px]">
            <FaGithub className="mr-2 size-4" />
            GitHub
          </Button>
          <Button variant="outline" className="w-full bg-transparent border-white/10 hover:bg-white/5 h-10 text-xs font-semibold rounded-[6px]">
            <FaFacebookF className="mr-2 size-3.5" />
            Facebook
          </Button>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-[12px] leading-relaxed text-slate-500 px-4">
          By clicking sign in, you agree to our{" "}
          <Link href="/terms" className="text-slate-300 underline underline-offset-4 hover:text-white transition-colors">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-slate-300 underline underline-offset-4 hover:text-white transition-colors">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
