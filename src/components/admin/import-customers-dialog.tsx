"use client";

import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { z } from "zod";
import type { Customer, CustomerStatus } from "@/types/customer";

const importRowSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  phone: z
    .string()
    .min(1, "Phone is required")
    .min(6, "Phone must be at least 6 characters"),
  address: z.string().optional(),
  status: z
    .enum(["active", "inactive"])
    .optional()
    .transform(
      (s): CustomerStatus => (s === "inactive" ? "inactive" : "active"),
    ),
});

type ImportRow = z.infer<typeof importRowSchema>;

function normalizePhone(phone: string) {
  return phone.replace(/\s+/g, "").replace(/[-–—]/g, "");
}

function parseCSV(text: string): Record<string, string>[] {
  const lines = text.trim().split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) return [];
  const header = lines[0].split(",").map((h) => h.trim().toLowerCase());
  const rows: Record<string, string>[] = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i]
      .split(",")
      .map((v) => v.trim().replace(/^"|"$/g, ""));
    const row: Record<string, string> = {};
    header.forEach((h, j) => {
      row[h] = values[j] ?? "";
    });
    rows.push(row);
  }
  return rows;
}

function csvRowToImportRow(row: Record<string, string>): ImportRow | null {
  const name = row.name ?? row["full name"] ?? "";
  const email = row.email ?? "";
  const phone = String(row.phone ?? "").trim();
  const address = row.address ?? "";
  const status = (row.status ?? "active").toLowerCase();
  const result = importRowSchema.safeParse({
    name,
    email,
    phone,
    address: address || undefined,
    status: status === "inactive" ? "inactive" : "active",
  });
  return result.success ? result.data : null;
}

function parseJSON(text: string): Record<string, unknown>[] {
  const data = JSON.parse(text);
  if (Array.isArray(data)) return data;
  if (data && typeof data === "object" && Array.isArray(data.customers))
    return data.customers;
  return [];
}

function jsonItemToImportRow(item: Record<string, unknown>): ImportRow | null {
  const name = String(item.name ?? item.fullName ?? "").trim();
  const email = String(item.email ?? "").trim();
  const phone = String(item.phone ?? "").trim();
  const address = item.address != null ? String(item.address) : undefined;
  const status = String(item.status ?? "active").toLowerCase();
  const result = importRowSchema.safeParse({
    name,
    email,
    phone,
    address,
    status: status === "inactive" ? "inactive" : "active",
  });
  return result.success ? result.data : null;
}

export type PreviewResult = {
  toAdd: Omit<Customer, "id">[];
  skippedDuplicate: number;
  invalid: number;
  errors: string[];
  fileName: string;
};

interface ImportCustomersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customers: Customer[];
  onImport: (toAdd: Omit<Customer, "id">[]) => void;
}

export function ImportCustomersDialog({
  open,
  onOpenChange,
  customers,
  onImport,
}: ImportCustomersDialogProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<PreviewResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const existingEmails = new Set(customers.map((c) => c.email.toLowerCase()));
  const existingPhones = new Set(customers.map((c) => normalizePhone(c.phone)));

  const processFile = (file: File) => {
    setPreview(null);
    setIsLoading(true);
    const ext = file.name.split(".").pop()?.toLowerCase();
    const isJSON = ext === "json";

    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result ?? "");
      const errors: string[] = [];
      let skippedDuplicate = 0;
      let invalid = 0;
      const seenEmails = new Set(existingEmails);
      const seenPhones = new Set(existingPhones);
      const toAdd: Omit<Customer, "id">[] = [];

      try {
        if (isJSON) {
          const items = parseJSON(text);
          for (let i = 0; i < items.length; i++) {
            const row = jsonItemToImportRow(
              items[i] as Record<string, unknown>,
            );
            if (!row) {
              invalid++;
              errors.push(`Row ${i + 1}: Invalid data`);
              continue;
            }
            const emailKey = row.email.toLowerCase();
            const phoneKey = normalizePhone(row.phone);
            if (seenEmails.has(emailKey) || seenPhones.has(phoneKey)) {
              skippedDuplicate++;
              continue;
            }
            seenEmails.add(emailKey);
            seenPhones.add(phoneKey);
            toAdd.push(row);
          }
        } else {
          const rows = parseCSV(text);
          for (let i = 0; i < rows.length; i++) {
            const row = csvRowToImportRow(rows[i]);
            if (!row) {
              invalid++;
              errors.push(
                `Row ${i + 2}: Invalid data (check name, email, phone)`,
              );
              continue;
            }
            const emailKey = row.email.toLowerCase();
            const phoneKey = normalizePhone(row.phone);
            if (seenEmails.has(emailKey) || seenPhones.has(phoneKey)) {
              skippedDuplicate++;
              continue;
            }
            seenEmails.add(emailKey);
            seenPhones.add(phoneKey);
            toAdd.push(row);
          }
        }

        setPreview({
          toAdd,
          skippedDuplicate,
          invalid,
          errors: errors.slice(0, 10),
          fileName: file.name,
        });
      } catch (e) {
        setPreview({
          toAdd: [],
          skippedDuplicate: 0,
          invalid: 0,
          errors: [e instanceof Error ? e.message : "Failed to parse file"],
          fileName: file.name,
        });
      }
      setIsLoading(false);
    };
    reader.onerror = () => {
      setPreview({
        toAdd: [],
        skippedDuplicate: 0,
        invalid: 0,
        errors: ["Failed to read file"],
        fileName: file.name,
      });
      setIsLoading(false);
    };
    reader.readAsText(file, "UTF-8");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && (file.name.endsWith(".csv") || file.name.endsWith(".json"))) {
      processFile(file);
    } else {
      setPreview({
        toAdd: [],
        skippedDuplicate: 0,
        invalid: 0,
        errors: ["Please upload a .csv or .json file"],
        fileName: "",
      });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleConfirmImport = () => {
    if (preview && preview.toAdd.length > 0) {
      onImport(preview.toAdd);
      onOpenChange(false);
      setPreview(null);
    }
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      setPreview(null);
      setIsLoading(false);
    }
    onOpenChange(open);
  };

  const showFileInput = !preview && !isLoading;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <input
          ref={inputRef}
          type="file"
          accept=".csv,.json"
          className="hidden"
          onChange={handleInputChange}
        />
        <DialogHeader>
          <DialogTitle>
            {showFileInput
              ? "Import customers"
              : isLoading
                ? "Processing file..."
                : "Preview import"}
          </DialogTitle>
          <DialogDescription>
            {showFileInput
              ? "Upload a CSV or JSON file. CSV: first row = headers (name, email, phone, address optional, status optional). JSON: array of objects with name, email, phone; address and status optional."
              : isLoading
                ? "Reading and validating your file. Please wait."
                : preview
                  ? `File: ${preview.fileName} · ${preview.toAdd.length} row(s) will be imported.`
                  : ""}
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Skeleton className="size-4 rounded-full" />
              <Skeleton className="h-4 w-48" />
            </div>
            <div className="border rounded-md overflow-hidden">
              <div className="border-b p-3 flex gap-4">
                <Skeleton className="h-4 w-10" />
                <Skeleton className="h-4 flex-1 max-w-[80px]" />
                <Skeleton className="h-4 flex-1 max-w-[120px]" />
                <Skeleton className="h-4 flex-1 max-w-[100px]" />
                <Skeleton className="h-4 flex-1 max-w-[100px]" />
                <Skeleton className="h-4 w-14" />
              </div>
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div
                  key={i}
                  className="border-b border-border/50 last:border-0 p-3 flex gap-4 items-center"
                >
                  <Skeleton className="h-4 w-8" />
                  <Skeleton className="h-4 flex-1 max-w-[100px]" />
                  <Skeleton className="h-4 flex-1 max-w-[140px]" />
                  <Skeleton className="h-4 flex-1 max-w-[110px]" />
                  <Skeleton className="h-4 flex-1 max-w-[90px]" />
                  <Skeleton className="h-5 w-14 rounded" />
                </div>
              ))}
            </div>
          </div>
        ) : showFileInput ? (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25"
            }`}
          >
            <p className="text-sm text-muted-foreground mb-4">
              Drag and drop a file here, or
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={() => inputRef.current?.click()}
            >
              Choose file
            </Button>
          </div>
        ) : (
          preview && (
            <>
              <div className="rounded-md border bg-muted/30 p-3 text-sm space-y-1 mb-4">
                <p className="font-medium">Summary</p>
                <p className="text-muted-foreground">
                  <span className="text-foreground font-medium">
                    {preview.toAdd.length}
                  </span>{" "}
                  row(s) will be imported
                  {preview.skippedDuplicate > 0 && (
                    <>
                      {" "}
                      ·{" "}
                      <span className="text-amber-600">
                        {preview.skippedDuplicate}
                      </span>{" "}
                      duplicate(s) skipped
                    </>
                  )}
                  {preview.invalid > 0 && (
                    <>
                      {" "}
                      ·{" "}
                      <span className="text-destructive">
                        {preview.invalid}
                      </span>{" "}
                      invalid row(s)
                    </>
                  )}
                </p>
                {preview.errors.length > 0 && (
                  <ul className="text-destructive text-xs list-disc list-inside mt-2">
                    {preview.errors.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                    {preview.errors.length >= 10 && <li>… and more</li>}
                  </ul>
                )}
              </div>

              {preview.toAdd.length > 0 ? (
                <div className="border rounded-md overflow-auto max-h-[280px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead className="max-w-[120px]">Address</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {preview.toAdd.map((row, i) => (
                        <TableRow key={i}>
                          <TableCell className="text-muted-foreground">
                            {i + 1}
                          </TableCell>
                          <TableCell className="font-medium">
                            {row.name}
                          </TableCell>
                          <TableCell className="text-sm">{row.email}</TableCell>
                          <TableCell className="text-sm">{row.phone}</TableCell>
                          <TableCell
                            className="text-muted-foreground text-xs max-w-[120px] truncate"
                            title={row.address}
                          >
                            {row.address || "—"}
                          </TableCell>
                          <TableCell>{row.status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground py-4 text-center">
                  No valid rows to import. Choose another file or fix the data.
                </p>
              )}

              <DialogFooter>
                <Button variant="outline" onClick={() => setPreview(null)}>
                  Back
                </Button>
                <Button
                  onClick={handleConfirmImport}
                  disabled={!preview || preview.toAdd.length === 0}
                >
                  Import{" "}
                  {preview?.toAdd.length ? `(${preview.toAdd.length})` : ""}
                </Button>
              </DialogFooter>
            </>
          )
        )}

        {showFileInput && (
          <DialogFooter>
            <Button variant="outline" onClick={() => handleClose(false)}>
              Close
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
