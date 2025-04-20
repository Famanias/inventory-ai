import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10">
            <div className="w-full max-w-[90%] sm:max-w-md md:max-w-lg">
                <LoginForm />
            </div>
        </div>
    );
}