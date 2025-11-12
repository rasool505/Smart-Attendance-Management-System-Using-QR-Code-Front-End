import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyTitle,
} from "@/components/ui/empty"


export default function Error404() {
    return (
        <div className="w-full h-screen text-white flex justify-center items-center">
        <Empty>
        <EmptyHeader>
            <EmptyTitle>404 - Not Found</EmptyTitle>
            <EmptyDescription>
            The page you&apos;re looking for doesn&apos;t exist.
            </EmptyDescription>
        </EmptyHeader>
        </Empty>
        </div>
    )
}
