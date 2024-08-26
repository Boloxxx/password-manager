"use client"

import { toast } from "@/components/ui/use-toast"
import { Element } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

export type ColumProps = Element

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "typeElement",
    header: "Type Element",
  },
  {
    accessorKey: "urlWebsite",
    header: "Url Website",
  },
  {
    accessorKey: "directory",
    header: "Directory",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell:({row}) => {
        const password = row.original.password
        const username = row.original.username

        const oneEditeElement = () => {
            console.log("Editing element")
        }

        const copyItemClipboard = (item: string, name: string) => {
            navigator.clipboard.writeText(item)
            toast({
                title: `${name} copied ✅`
            })
        }
    }
  },
]
