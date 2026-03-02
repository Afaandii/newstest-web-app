"use client";

import { useEffect, useState, use } from "react";
import { Layout, Body } from "@/components/layout";
import { RoleForm } from "../../role-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function UpdateRolePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [role, setRole] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await fetch(`http://localhost:8080/v1/roles/${id}`);
        const result = await response.json();
        if (result.status === "success") {
          setRole(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch role:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, [id]);

  return (
    <Layout>
      <Body className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Update Role</h1>
          <p className="text-muted-foreground mt-1">
            Edit the details for this role.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Role Details</CardTitle>
            <CardDescription>
              Modify the name and access level for this role.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-24 flex items-center justify-center text-muted-foreground">
                Loading role details...
              </div>
            ) : role ? (
              <RoleForm 
                id={id} 
                initialData={{
                  name: role.name,
                  handle_access: role.handle_access,
                }} 
              />
            ) : (
              <div className="h-24 flex items-center justify-center text-destructive">
                Role not found.
              </div>
            )}
          </CardContent>
        </Card>
      </Body>
    </Layout>
  );
}
