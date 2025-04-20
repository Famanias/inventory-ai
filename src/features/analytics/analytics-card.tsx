import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Clipboard, AlertTriangle, ShoppingCart, DollarSign, LucideIcon } from "lucide-react"

interface AnalyticsCardProps {
    name: string;
    value: string;
    description: string;
    icon?: LucideIcon;
    iconColor?: string;
}

export default function AnalyticsCard({ name, value, description, icon: Icon, iconColor }: AnalyticsCardProps) {
    return (
        <Card className="gap-2">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                {Icon && (
                    <div className="mr-2">
                        <Icon className="h-5 w-5" style={{ color: iconColor }} />
                    </div>
                )}
                <CardTitle>{name}</CardTitle>
            </CardHeader>
            <CardContent className="m-0">
                <p className="text-2xl font-bold">{value}</p>
            </CardContent>
            <CardFooter className="m-0s">
                <CardDescription>{description}</CardDescription>
            </CardFooter>
        </Card>
    );
}