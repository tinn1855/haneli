"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  customerFormSchema,
  type CustomerFormValues,
} from "@/lib/schemas/customer";
import type { Customer, CustomerStatus } from "@/types/customer";

const STATUS_OPTIONS: { value: CustomerStatus; label: string }[] = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

const defaultValues: CustomerFormValues = {
  name: "",
  email: "",
  phone: "",
  address: "",
  status: "active",
};

function getFormValues(customer: Customer | null): CustomerFormValues {
  if (!customer) return defaultValues;
  return {
    name: customer.name,
    email: customer.email,
    phone: customer.phone,
    address: customer.address ?? "",
    status: customer.status,
  };
}

interface CustomerFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer: Customer | null;
  customers: Customer[];
  onSubmit: (
    data: Omit<Customer, "id"> | (Partial<Customer> & { id: string })
  ) => void;
}

/** Chuẩn hóa số điện thoại để so sánh (bỏ khoảng trắng, dấu gạch). */
function normalizePhone(phone: string) {
  return phone.replace(/\s+/g, "").replace(/[-–—]/g, "");
}

export function CustomerFormDialog({
  open,
  onOpenChange,
  customer,
  customers,
  onSubmit,
}: CustomerFormDialogProps) {
  const isEdit = !!customer;
  const excludeId = customer?.id ?? null;

  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: getFormValues(customer),
  });

  useEffect(() => {
    if (open) {
      form.reset(getFormValues(customer));
    }
  }, [open, customer, form]);

  const handleSubmit = (data: CustomerFormValues) => {
    const emailTaken = customers.some(
      (c) => c.id !== excludeId && c.email.toLowerCase() === data.email.toLowerCase()
    );
    const phoneNormalized = normalizePhone(data.phone);
    const phoneTaken = customers.some(
      (c) => c.id !== excludeId && normalizePhone(c.phone) === phoneNormalized
    );

    if (emailTaken) {
      form.setError("email", {
        type: "manual",
        message: "This email is already in use",
      });
      return;
    }
    if (phoneTaken) {
      form.setError("phone", {
        type: "manual",
        message: "This phone number is already in use",
      });
      return;
    }

    if (isEdit && customer) {
      onSubmit({ ...data, id: customer.id });
    } else {
      onSubmit(data);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Customer" : "Add Customer"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="mt-4 space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Full name"
                      {...field}
                    />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="email@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+1 234 567 8900"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address (optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Street, City, State, ZIP"
                      rows={2}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {STATUS_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">{isEdit ? "Save" : "Add Customer"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
