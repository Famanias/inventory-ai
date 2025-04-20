import { SidebarProvider } from "@/components/ui/sidebar";
import { NavigationBar } from "@/components/navigation-bar";
import Header from "@/components/header";
export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex">
            <SidebarProvider>
                <NavigationBar />
                <main className="flex-col w-full">
                    <Header />
                        {children}
                </main>
            </SidebarProvider>
        </div>
    );
}
