'use client'
import * as React from "react"

import { ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import Product from "./products/domains/Product"
import ProductRowActionDropDown from "./products/product-row-action-dropdown"
import {
    ColumnDef
} from "@tanstack/react-table"

export const columns = (onEdit: (product: Product) => void, onDelete: (id: string) => void): ColumnDef<Product>[] => [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "ID",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                ID
                <ArrowUpDown />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("ID")}</div>
        ),
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
    },
    {
        accessorKey: "category",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Category
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => <div className="Capitalize">{row.getValue("category")}</div>,
    },
    {
        accessorKey: "quantity",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Quantity
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("quantity")}</div>,
    },
    {
        accessorKey: "price",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Price
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("price")}</div>,
        sortingFn: (rowA, rowB, columnId) => {
            const a = parseFloat(rowA.getValue(columnId)) || 0;
            const b = parseFloat(rowB.getValue(columnId)) || 0;
            return a - b; // Ascending order
        },
    },
    {
        accessorKey: "total",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Total
                <ArrowUpDown />
            </Button>
        ),
        accessorFn: (row) => row.price * row.quantity, // Compute total
        cell: ({ row }) => (
            <div>{(Number(row.getValue("total")) || 0).toFixed(2)}</div> // Format as number
        ),
        sortingFn: (rowA, rowB, columnId) => {
            const a = parseFloat(rowA.getValue(columnId)) || 0;
            const b = parseFloat(rowB.getValue(columnId)) || 0;
            return a - b; // Ascending order
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Status
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => {
            const status = row.getValue("quantity") as number;
            if (status === 0) {
                return <div className="capitalize text-red-500">Out of Stock</div>;
            } else if (status < 10 && status !== 0) {
                return <div className="capitalize text-yellow-500">Low Stock</div>;
            } else {
                return <div className="capitalize text-green-500">In Stock</div>;
            }
        },
        sortingFn: (rowA, rowB) => {
            const getStatusOrder = (quantity: number) => {
                if (quantity === 0) return 0; // Out of Stock
                if (quantity < 10) return 1; // Low Stock
                return 2; // In Stock
            };
    
            const statusA = getStatusOrder(rowA.getValue("quantity") as number);
            const statusB = getStatusOrder(rowB.getValue("quantity") as number);
    
            return statusA - statusB; // Ascending order: Out of Stock < Low Stock < In Stock
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({row}) => {
            return (
                <ProductRowActionDropDown
                    product={row.original}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            )
        },
    },
]