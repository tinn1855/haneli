import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Badge } from "@/components/ui/badge";
import {
  DollarSign,
  Package,
  ShoppingCart,
  Users,
  Settings,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import Link from "next/link";

const stats = [
  {
    title: "Revenue",
    value: "$24.5K",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Orders",
    value: "156",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingCart,
  },
  {
    title: "Products",
    value: "48",
    change: "-2.4%",
    trend: "down",
    icon: Package,
  },
  {
    title: "Customers",
    value: "1,234",
    change: "+18.1%",
    trend: "up",
    icon: Users,
  },
];

const recentOrders = [
  { id: "#ORD-2841", customer: "John Doe", amount: "$450", status: "pending" },
  { id: "#ORD-2840", customer: "Jane Smith", amount: "$1,200", status: "completed" },
  { id: "#ORD-2839", customer: "Bob Wilson", amount: "$890", status: "shipping" },
  { id: "#ORD-2838", customer: "Alice Brown", amount: "$2,150", status: "completed" },
  { id: "#ORD-2837", customer: "Charlie Lee", amount: "$340", status: "cancelled" },
];

const statusVariant = {
  pending: "secondary",
  completed: "default",
  shipping: "outline",
  cancelled: "destructive",
} as const;

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <Heading variant="h1" className="text-2xl font-light tracking-tight">
          Dashboard
        </Heading>
        <p className="mt-1 text-sm text-muted-foreground">
          Business overview
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-light text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-light">{stat.value}</div>
                <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="size-3 text-green-600" />
                  ) : (
                    <ArrowDownRight className="size-3 text-red-600" />
                  )}
                  <span
                    className={
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }
                  >
                    {stat.change}
                  </span>
                  vs last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-light">Recent Orders</CardTitle>
              <CardDescription>Latest orders</CardDescription>
            </div>
            <Link
              href="/admin/orders"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              View all
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between border-b border-border/50 pb-4 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.customer}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-light">{order.amount}</p>
                    <Badge
                      variant={statusVariant[order.status as keyof typeof statusVariant]}
                      className="mt-1"
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-light">Quick Actions</CardTitle>
            <CardDescription>Frequently used tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href="/admin/products"
                className="flex items-center gap-3 rounded-lg border border-border/50 p-4 transition-colors hover:border-foreground/30 hover:bg-muted/50"
              >
                <Package className="size-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Add Product</p>
                  <p className="text-xs text-muted-foreground">
                    Create new product
                  </p>
                </div>
              </Link>
              <Link
                href="/admin/orders"
                className="flex items-center gap-3 rounded-lg border border-border/50 p-4 transition-colors hover:border-foreground/30 hover:bg-muted/50"
              >
                <ShoppingCart className="size-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Process Orders</p>
                  <p className="text-xs text-muted-foreground">
                    Manage orders
                  </p>
                </div>
              </Link>
              <Link
                href="/admin/customers"
                className="flex items-center gap-3 rounded-lg border border-border/50 p-4 transition-colors hover:border-foreground/30 hover:bg-muted/50"
              >
                <Users className="size-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Customers</p>
                  <p className="text-xs text-muted-foreground">
                    View list
                  </p>
                </div>
              </Link>
              <Link
                href="/admin/settings"
                className="flex items-center gap-3 rounded-lg border border-border/50 p-4 transition-colors hover:border-foreground/30 hover:bg-muted/50"
              >
                <Settings className="size-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Settings</p>
                  <p className="text-xs text-muted-foreground">
                    Configure system
                  </p>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
