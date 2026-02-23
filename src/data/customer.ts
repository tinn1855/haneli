import type { Customer } from "@/types/customer";

export const initialCustomers: Customer[] = [
  {
    id: "cust-1",
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    phone: "+1 234 567 8901",
    address: "123 Main St, New York, NY 10001",
    status: "active",
  },
  {
    id: "cust-2",
    name: "James Chen",
    email: "james.chen@example.com",
    phone: "+1 234 567 8902",
    address: "456 Oak Ave, Los Angeles, CA 90001",
    status: "active",
  },
  {
    id: "cust-3",
    name: "Sarah Martinez",
    email: "sarah.m@example.com",
    phone: "+1 234 567 8903",
    status: "inactive",
  },
];
