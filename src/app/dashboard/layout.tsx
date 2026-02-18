import { AdminSidebar } from '@/components/AdminSidebar'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <AdminSidebar />
            <div className="flex-1 overflow-auto">
                {children}
            </div>
        </div>
    )
}
