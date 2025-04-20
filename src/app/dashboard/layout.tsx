import { SidebarProvider } from "@/components/ui/sidebar";
import { NavigationBar } from "@/components/navigation-bar";
import Header from "@/components/header";
export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex min-h-screen">
            <SidebarProvider>
                <NavigationBar />
                <main className="flex-1 flex flex-col w-full overflow-x-hidden">
                    <Header />
                    <div className="flex-1 p-4 md:p-6 lg:p-8">
                        {children}
                    </div>
                </main>
            </SidebarProvider>
        </div>
    );
}
