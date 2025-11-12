import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyTitle,
} from "@/components/ui/empty"


export default function Error403() {
    return (
        <div className="w-full h-screen text-white flex justify-center items-center">
        <Empty>
        <EmptyHeader>
            <EmptyTitle>403 - Forbidden</EmptyTitle>
            <EmptyDescription>
                You don&apos;t have permission to access this page.
            </EmptyDescription>
        </EmptyHeader>
        </Empty>
        </div>
    )
}
