import { UserCourierConfigure } from "@/components/Admin/User/user-courier-configure";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function CourierConfigurePage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Configure User&apos;s Courier</CardTitle>
                <CardDescription>Manage courier price and toggle courier for user.</CardDescription>
            </CardHeader>
            <CardContent>
                <UserCourierConfigure />
            </CardContent>
        </Card>
    );
}