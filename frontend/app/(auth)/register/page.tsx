"use client";

import { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { 
  HiOutlineEye, 
  HiOutlineEyeSlash,
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

const registerSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: RegisterFormValues) {
    setIsLoading(true);
    console.log(values);
    setTimeout(() => {
      setIsLoading(false);
      alert("Register simulation: Check console for data");
    }, 1500);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#020617] text-white p-4 overflow-y-auto [scrollbar-gutter:stable] scrollbar-custom">
      {/* Brand Header */}
      <div className="flex items-center gap-2 mb-6 pt-8">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6">
          <path d="M18.3 5.71a2.83 2.83 0 0 0-4 0L12 8l-2.3-2.29a2.83 2.83 0 0 0-4 4L12 16l6.3-6.29a2.83 2.83 0 0 0 0-4Z" />
          <path d="M15.54 8.46 5.71 18.29" />
          <path d="m8.46 15.54 9.83-9.83" />
        </svg>
        <span className="text-xl font-bold tracking-tight">Shadcn Admin</span>
      </div>

      {/* Register Card */}
      <div className="w-full max-w-[400px] rounded-[12px] border border-white/5 bg-[#020817] p-8 shadow-2xl mb-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
          <p className="text-sm text-slate-400 mt-2 leading-relaxed">
            Enter your email and password to create an account.
            <br />
            Already have an account?{" "}
            <Link href="/login" className="text-white underline underline-offset-4 hover:text-slate-200 transition-colors">
              Sign In
            </Link>
          </p>
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
                  <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-200">Password</FormLabel>
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

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-200">Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        type={showConfirmPassword ? "text" : "password"} 
                        placeholder="********" 
                        className="pr-10 bg-[#020817] border-white/10 h-10 focus-visible:ring-1 focus-visible:ring-white/20"
                        {...field} 
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                      >
                        {showConfirmPassword ? (
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
                "Create Account"
              )}
            </Button>
          </form>
        </Form>

        {/* Divider */}
        <div className="relative my-8">
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
          By creating an account, you agree to our{" "}
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
