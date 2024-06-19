"use client";

import { Payment } from "@/interfaces/interfaces";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "no",
    header: "No.",
  },
  {
    accessorKey: "date",
    header: "Fecha",
  },
  {
    accessorKey: "totalToPay",
    header: "Total a pagar",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalToPay"));
      const formatted = new Intl.NumberFormat("es-CR", {
        style: "currency",
        currency: "CRC",
      }).format(amount);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "capitalPending",
    header: "Capital pendiente",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("capitalPending"));
      const formatted = new Intl.NumberFormat("es-CR", {
        style: "currency",
        currency: "CRC",
      }).format(amount);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "capitalPayment",
    header: "Pago de capital",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("capitalPayment"));
      const formatted = new Intl.NumberFormat("es-CR", {
        style: "currency",
        currency: "CRC",
      }).format(amount);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "interest",
    header: "Interés",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("interest"));
      const formatted = new Intl.NumberFormat("es-CR", {
        style: "currency",
        currency: "CRC",
      }).format(amount);

      return <div>{formatted}</div>;
    },
  },
];
