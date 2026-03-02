"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

const roleSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  handle_access: z.string().min(2, {
    message: "Handle access must be at least 2 characters.",
  }),
});

type RoleFormValues = z.infer<typeof roleSchema>;

interface RoleFormProps {
  initialData?: RoleFormValues;
  id?: string;
}

export function RoleForm({ initialData, id }: RoleFormProps) {
  const router = useRouter();
  const isEditing = !!id;

  const form = useForm<RoleFormValues>({
    resolver: zodResolver(roleSchema),
    defaultValues: initialData || {
      name: "",
      handle_access: "",
    },
  });

  async function onSubmit(values: RoleFormValues) {
    try {
      const url = isEditing 
        ? `http://localhost:8080/v1/roles/${id}` 
        : "http://localhost:8080/v1/roles";
      
      const method = isEditing ? "PUT" : "POST";
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          handle_access: values.handle_access,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert(isEditing ? "Role updated successfully!" : "Role created successfully!");
        router.push("/dashboard/roles");
      } else {
        alert(result.errors || "Failed to save role");
      }
    } catch (err: any) {
      alert(err.message || "An error occurred");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-2xl">
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Admin" {...field} />
                </FormControl>
                <FormDescription>
                  This is the public display name for the role.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="handle_access"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Handle Access</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g. Can handle all menus" 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Define the access level for this role.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center gap-4">
          <Button type="submit" className="cursor-pointer">
            {isEditing ? "Submit" : "Submit"}
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard/roles">Cancel</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
