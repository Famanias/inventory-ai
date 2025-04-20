'use client'
import { SidebarTrigger } from "./ui/sidebar";

export default function Header() {
    return (
        <div className="flex items-center justify-between py-2 px-4 md:px-6 lg:px-8 border-b border-gray-400 w-full">
            <div className="flex gap-4 md:gap-6 items-center">
                <SidebarTrigger />
                <h3 className="scroll-m-20 text-xl md:text-2xl font-semibold tracking-tight">
                    Inventory AI
                </h3>
            </div>
            <div className="flex items-center gap-4">
                {/* MENU */}
            </div>
        </div>
    );
}