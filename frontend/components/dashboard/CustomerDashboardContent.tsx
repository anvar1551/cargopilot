// frontend/components/dashboard/CustomerDashboardContent.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CustomerDashboardContent() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Total Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">23</p>
          <p className="text-sm text-muted-foreground">+5 this week</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>In Transit</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">6</p>
          <p className="text-sm text-muted-foreground">2 expected today</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Delivered</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">14</p>
          <p className="text-sm text-muted-foreground">+3 from last week</p>
        </CardContent>
      </Card>
    </div>
  );
}
