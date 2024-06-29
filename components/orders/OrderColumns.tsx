"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import StatusIndicator from "./OrderStatus";

export const columns: ColumnDef<OrderColumnType>[] = [
  {
    accessorKey: "_id",
    header: "Order",
    cell: ({ row }) => {
      return (
        <Link
          href={`/orders/${row.original._id}`}
          className="hover:text-red-1"
        >
          {row.original._id}
        </Link>
      );
    },
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "totalAmount",
    header: "Total (Rs.)",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => {
      return row.original._id !== undefined ? <StatusIndicator initialStatus={row.original.status} orderId={row.original._id} /> : <></>
    },
  },
];
