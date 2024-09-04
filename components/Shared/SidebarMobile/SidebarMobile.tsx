"use client"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Leaf, Menu } from "lucide-react";
import { SidebarRoutes } from "../SidebarRoutes";
import { Button } from "@/components/ui/button";

export function SidebarMobile() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
            <Menu/>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-gray-800 text-white">
        <SheetHeader className="text-left mb-5">
          <SheetTitle className="text-white">BoloxPassword</SheetTitle>
          <SheetDescription className="text-slate-100">
            Create and manage all of your password
          </SheetDescription>
        </SheetHeader>
        <SidebarRoutes/>
      </SheetContent>
    </Sheet>
  );
}
