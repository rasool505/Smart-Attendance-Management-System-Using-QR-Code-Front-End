import { Spinner } from '@/Components/ui/spinner';
import { Button } from "@/components/ui/button"
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"


export default function Loading() {
    return (
        <div className="w-full h-screen flex justify-center items-center">
        <Empty className="w-full">
        <EmptyHeader>
            <EmptyMedia variant="icon">
            <Spinner />
            </EmptyMedia>
            <EmptyTitle className="text-white">Processing your request</EmptyTitle>
            <EmptyDescription>
            Please wait while we process your request. Do not refresh the page.
            </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
            <Button variant="outline" size="sm" onClick={()=>{
                window.location.reload();
            }}>
                Refresh
            </Button>
        </EmptyContent>
        </Empty>
        </div>
    )
}
