import { Layout, Body } from "@/components/layout";
import { RoleForm } from "../role-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function CreateRolePage() {
  return (
    <Layout>
      <Body className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Role</h1>
          <p className="text-muted-foreground mt-1">
            Add a new role to the system.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Role Details</CardTitle>
            <CardDescription>
              Enter the name and access level for the new role.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RoleForm />
          </CardContent>
        </Card>
      </Body>
    </Layout>
  );
}
