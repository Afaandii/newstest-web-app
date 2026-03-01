"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const registerSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  nip: z.string().min(10, {
    message: "NIP must be at least 10 characters.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      nip: "",
      address: "",
    },
  });

  async function onSubmit(values: RegisterFormValues) {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:8080/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Account created successfully! Please sign in.");
        router.push("/login");
      } else {
        alert(result.errors || "Failed to register. Please try again.");
      }
    } catch (err: any) {
      alert(err.message || "An error occurred during registration.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#020617] text-white p-4 overflow-y-auto [scrollbar-gutter:stable] scrollbar-custom">
      {/* Brand Header */}
      <div className="flex items-center gap-2 mb-6 pt-8">
        <span className="text-xl font-bold tracking-tight">NewsTest Register</span>
      </div>

      {/* Register Card */}
      <div className="w-full max-w-[500px] rounded-[12px] border border-white/5 bg-[#020817] p-8 shadow-2xl mb-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl text-center font-bold tracking-tight">Sign Up</h1>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-200">Full Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="John Doe" 
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
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-200">Email Address</FormLabel>
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
              name="nip"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-200">NIP</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="1234567890" 
                      {...field} 
                      className="bg-[#020817] border-white/10 h-10 focus-visible:ring-1 focus-visible:ring-white/20"
                    />
                  </FormControl>
                  <FormDescription className="text-[10px] text-slate-500">Employee Identification Number.</FormDescription>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-200">Address</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter your residence address" 
                      {...field} 
                      className="bg-[#020817] border-white/10 min-h-[80px] focus-visible:ring-1 focus-visible:ring-white/20"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full bg-slate-100 text-[#020817] hover:bg-slate-200 h-10 font-bold tracking-tight rounded-[6px] cursor-pointer pt-0"
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
          <Button variant="outline" className="w-full cursor-pointer bg-transparent border-white/10 hover:bg-white/5 h-10 text-xs font-semibold rounded-[6px]">
            <FaGithub className="mr-2 size-4" />
            GitHub
          </Button>
          <Button variant="outline" className="w-full cursor-pointer bg-transparent border-white/10 hover:bg-white/5 h-10 text-xs font-semibold rounded-[6px]">
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
