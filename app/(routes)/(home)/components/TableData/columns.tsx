"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { Element } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Copy, MoreHorizontal, Trash, User } from "lucide-react";

export type ColumProps = Element;

export const columns: ColumnDef<ColumProps>[] = [
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
    cell: ({ row }) => {
      const { id, password, username } = row.original;

      const oneEditElement = () => {
        window.location.href = `/element/${id}`;
      };

      const copyItemClipboard = (item: string, name: string) => {
        navigator.clipboard.writeText(item);
        toast({
          title: `${name} copied ✅`,
        });
      };

      const deleteElement = async (itemId: string) => {
        try {
          const response = await fetch(`/api/deleteItem/route/${itemId}`, {
            method: "DELETE",
          });

          if (response.ok) {
            const data = await response.json();
            toast({
              title: "Elemento eliminado correctamente ✅",
            });
            // Aquí actualiza la UI si es necesario
          } else {
            toast({
              title: "Ha ocurrido un error eliminando este item ❌",
            });
          }
        } catch (error) {
          console.error("Failed to delete element:", error);
          toast({
            title: "Failed to delete element ❌",
          });
        }
      };

      return (
        <div className="flex gap-2 justify-center items-center">
          {password && (
            <Copy
              className="w-4 h-4 cursor-pointer"
              onClick={() => copyItemClipboard(password, "Password")}
            />
          )}
          {username && (
            <User
              className="w-4 h-4 cursor-pointer"
              onClick={() => copyItemClipboard(username, "Username")}
            />
          )}

          <Trash
            className="w-4 h-4 cursor-pointer"
            onClick={() => deleteElement(id)} // Cambiado para pasar una función que se ejecuta al hacer clic
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"} className="h-8 w-8 p-0">
                <span className="sr-only">Open Menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={oneEditElement}>Edit</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
