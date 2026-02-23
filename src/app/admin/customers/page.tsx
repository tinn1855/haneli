"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { useAdminCustomers } from "@/contexts/admin-customers-context";
import { CustomerFormDialog } from "@/components/admin/customer-form-dialog";
import { DeleteCustomerDialog } from "@/components/admin/delete-customer-dialog";
import { DeleteBulkCustomersDialog } from "@/components/admin/delete-bulk-customers-dialog";
import { ImportCustomersDialog } from "@/components/admin/import-customers-dialog";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Search, Upload } from "lucide-react";
import type { Customer } from "@/types/customer";

function buildPageUrl(page: number) {
  const params = new URLSearchParams();
  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `/admin/customers?${query}` : "/admin/customers";
}

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20, 50];
const DEFAULT_ITEMS_PER_PAGE = 10;

export default function AdminCustomersPage() {
  const searchParams = useSearchParams();
  const {
    customers,
    addCustomer,
    addCustomers,
    updateCustomer,
    deleteCustomer,
    deleteCustomers,
    resetToDefault,
  } = useAdminCustomers();

  const pageParam = searchParams.get("page");
  const currentPage = Math.max(
    1,
    Math.min(parseInt(pageParam || "1", 10) || 1, 999999),
  );

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(
    null,
  );
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const searchLower = search.toLowerCase();
      const matchesSearch =
        !search ||
        customer.name.toLowerCase().includes(searchLower) ||
        customer.email.toLowerCase().includes(searchLower) ||
        customer.phone.includes(search) ||
        (customer.address &&
          customer.address.toLowerCase().includes(searchLower));
      const matchesStatus =
        statusFilter === "all" || customer.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [customers, search, statusFilter]);

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage) || 1;
  const paginatedCustomers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCustomers.slice(start, start + itemsPerPage);
  }, [filteredCustomers, currentPage, itemsPerPage]);

  const handleAdd = () => {
    setEditingCustomer(null);
    setFormOpen(true);
  };

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setFormOpen(true);
  };

  const handleFormSubmit = (
    data: Omit<Customer, "id"> | (Partial<Customer> & { id: string }),
  ) => {
    try {
      if ("id" in data && data.id && editingCustomer) {
        const { id, ...updates } = data;
        updateCustomer(id, updates);
        toast.success("Customer updated successfully");
      } else {
        addCustomer(data as Omit<Customer, "id">);
        toast.success("Customer added successfully");
      }
      setEditingCustomer(null);
    } catch {
      toast.error("Failed to save customer");
    }
  };

  const handleDeleteClick = (customer: Customer) => {
    setCustomerToDelete(customer);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!customerToDelete) return;
    try {
      deleteCustomer(customerToDelete.id);
      toast.success("Customer deleted successfully");
      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.delete(customerToDelete.id);
        return next;
      });
      setCustomerToDelete(null);
    } catch {
      toast.error("Failed to delete customer");
    }
  };

  const handleBulkDeleteClick = () => {
    if (selectedIds.size > 0) setBulkDeleteDialogOpen(true);
  };

  const handleBulkDeleteConfirm = () => {
    if (selectedIds.size === 0) return;
    try {
      const count = selectedIds.size;
      deleteCustomers(Array.from(selectedIds));
      setSelectedIds(new Set());
      toast.success(`${count} customer(s) deleted successfully`);
    } catch {
      toast.error("Failed to delete customers");
    }
  };

  const handleImport = (toAdd: Omit<Customer, "id">[]) => {
    try {
      addCustomers(toAdd);
      toast.success(`Imported ${toAdd.length} customer(s) successfully`);
    } catch {
      toast.error("Failed to import customers");
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = (checked: boolean | "indeterminate") => {
    if (checked === "indeterminate" || checked) {
      setSelectedIds(new Set(paginatedCustomers.map((c) => c.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const isAllSelected =
    paginatedCustomers.length > 0 &&
    paginatedCustomers.every((c) => selectedIds.has(c.id));
  const isSomeSelected = paginatedCustomers.some((c) => selectedIds.has(c.id));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Heading variant="h1" className="text-2xl font-light tracking-tight">
            Customers
          </Heading>
          <p className="mt-1 text-muted-foreground">
            Manage your customer list
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {selectedIds.size > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleBulkDeleteClick}
            >
              <Trash2 />
              Delete All ({selectedIds.size})
            </Button>
          )}
          <Button variant="outline" onClick={() => setImportDialogOpen(true)}>
            <Upload />
            Import
          </Button>
          <Button onClick={handleAdd}>
            <Plus />
            Add Customer
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, phone, address..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select
              value={statusFilter}
              onValueChange={(v) => setStatusFilter(v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Checkbox
                    checked={
                      isAllSelected
                        ? true
                        : isSomeSelected
                          ? "indeterminate"
                          : false
                    }
                    onCheckedChange={toggleSelectAll}
                    aria-label="Select all"
                  />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedCustomers.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No customers found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedCustomers.map((customer) => (
                  <TableRow
                    key={customer.id}
                    data-state={
                      selectedIds.has(customer.id) ? "selected" : undefined
                    }
                  >
                    <TableCell>
                      <Checkbox
                        checked={selectedIds.has(customer.id)}
                        onCheckedChange={() => toggleSelect(customer.id)}
                        aria-label={`Select ${customer.name}`}
                      />
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">{customer.name}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-muted-foreground text-sm">
                        {customer.email}
                      </p>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{customer.phone}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-muted-foreground line-clamp-1 text-xs max-w-[180px] block">
                        {customer.address || "—"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          customer.status === "active"
                            ? "default"
                            : "destructive"
                        }
                      >
                        {customer.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => handleEdit(customer)}
                          aria-label="Edit"
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => handleDeleteClick(customer)}
                          aria-label="Delete"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {filteredCustomers.length > 0 && (
            <div className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center justify-between">
              <div className="flex w-full items-center gap-2 text-sm text-muted-foreground">
                <Select
                  value={String(itemsPerPage)}
                  onValueChange={(v) => setItemsPerPage(Number(v))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ITEMS_PER_PAGE_OPTIONS.map((n) => (
                      <SelectItem key={n} value={String(n)}>
                        {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span>
                  Showing {(currentPage - 1) * itemsPerPage + 1}-
                  {Math.min(
                    currentPage * itemsPerPage,
                    filteredCustomers.length,
                  )}{" "}
                  of {filteredCustomers.length} customers
                </span>
              </div>
              <Pagination className="w-full justify-end">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href={buildPageUrl(Math.max(1, currentPage - 1))}
                      className={
                        currentPage <= 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                      aria-disabled={currentPage <= 1}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((page) => {
                      if (totalPages <= 7) return true;
                      if (
                        page === 1 ||
                        page === totalPages ||
                        Math.abs(page - currentPage) <= 1
                      )
                        return true;
                      if (page === 2 && currentPage > 3) return true;
                      if (
                        page === totalPages - 1 &&
                        currentPage < totalPages - 2
                      )
                        return true;
                      return false;
                    })
                    .map((page, idx, arr) => {
                      const showEllipsisBefore =
                        idx > 0 && page - arr[idx - 1] > 1;
                      return (
                        <React.Fragment key={page}>
                          {showEllipsisBefore && (
                            <PaginationItem>
                              <PaginationEllipsis />
                            </PaginationItem>
                          )}
                          <PaginationItem>
                            <PaginationLink
                              href={buildPageUrl(page)}
                              isActive={currentPage === page}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        </React.Fragment>
                      );
                    })}
                  <PaginationItem>
                    <PaginationNext
                      href={buildPageUrl(Math.min(totalPages, currentPage + 1))}
                      className={
                        currentPage >= totalPages
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                      aria-disabled={currentPage >= totalPages}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>

      <CustomerFormDialog
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setEditingCustomer(null);
        }}
        customer={editingCustomer}
        customers={customers}
        onSubmit={handleFormSubmit}
      />
      <DeleteCustomerDialog
        open={deleteDialogOpen}
        onOpenChange={(open) => {
          setDeleteDialogOpen(open);
          if (!open) setCustomerToDelete(null);
        }}
        customer={customerToDelete}
        onConfirm={handleDeleteConfirm}
      />
      <DeleteBulkCustomersDialog
        open={bulkDeleteDialogOpen}
        onOpenChange={setBulkDeleteDialogOpen}
        count={selectedIds.size}
        onConfirm={handleBulkDeleteConfirm}
      />
      <ImportCustomersDialog
        open={importDialogOpen}
        onOpenChange={setImportDialogOpen}
        customers={customers}
        onImport={handleImport}
      />
    </div>
  );
}
