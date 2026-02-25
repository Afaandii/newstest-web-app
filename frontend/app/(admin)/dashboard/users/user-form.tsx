"use client";

import { useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { HiOutlinePhoto, HiOutlineXCircle, HiOutlineUser } from "react-icons/hi2";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const userSchema = z.object({
  nama: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }).optional().or(z.literal("")),
  nip: z.string().min(10, {
    message: "NIP must be at least 10 characters.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  role_id: z.string({
    required_error: "Please select a role.",
  }),
  avatar: z.any().optional(),
});

type UserFormValues = z.infer<typeof userSchema>;

interface UserFormProps {
  initialData?: UserFormValues & { avatar_url?: string };
  id?: string;
}

const roles = [
  { id: "1", name: "Super Admin" },
  { id: "2", name: "Admin" },
  { id: "3", name: "Editor" },
  { id: "4", name: "Writer" },
];

export function UserForm({ initialData, id }: UserFormProps) {
  const router = useRouter();
  const isEditing = !!id;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialData?.avatar_url || null);

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: initialData || {
      nama: "",
      email: "",
      password: "",
      nip: "",
      address: "",
      role_id: "",
    },
  });

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      form.setValue("avatar", file);
    }
  }

  function removeAvatar() {
    setPreviewUrl(null);
    form.setValue("avatar", undefined);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function onSubmit(values: UserFormValues) {
    console.log(values);
    alert(isEditing ? "User updated successfully!" : "User created successfully!");
    router.push("/dashboard/users");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-4xl">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Avatar Section */}
          <div className="md:col-span-2 flex flex-col items-center gap-4">
            <div 
              className="relative size-32 rounded-full border-2 border-dashed border-muted-foreground/25 bg-muted/50 flex items-center justify-center overflow-hidden transition-colors hover:bg-muted cursor-pointer group"
              onClick={() => fileInputRef.current?.click()}
            >
              {previewUrl ? (
                <>
                  <Image 
                    src={previewUrl} 
                    alt="Avatar preview" 
                    fill 
                    className="object-cover" 
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <HiOutlinePhoto className="size-8 text-white" />
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-1 text-muted-foreground">
                  <HiOutlineUser className="size-12 opacity-50" />
                  <span className="text-[10px] uppercase font-bold tracking-wider">Upload</span>
                </div>
              )}
            </div>
            
            {previewUrl && (
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                className="text-destructive h-8"
                onClick={removeAvatar}
              >
                <HiOutlineXCircle className="mr-2 size-4" /> Remove Photo
              </Button>
            )}
            
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <FormField
            control={form.control}
            name="nama"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="example@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nip"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NIP</FormLabel>
                <FormControl>
                  <Input placeholder="199XXXXXXXXXXXXXXX" {...field} />
                </FormControl>
                <FormDescription>Employee Identification Number.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.id} value={role.id}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{isEditing ? "New Password (Optional)" : "Password"}</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter resident address" 
                    className="min-h-[100px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center gap-4 pt-6 border-t font-semibold">
          <Button type="submit" size="lg" className="min-w-[150px]">
            {isEditing ? "Update User" : "Save User"}
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/dashboard/users">Cancel</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
