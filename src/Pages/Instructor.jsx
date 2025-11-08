import { generateSession, getAllReports, getAllSubjectsOfInstructor } from "@/Api/Api"
import { Axios } from "@/Api/AxiosCreate"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/Components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useState } from "react"
import Cookie from 'cookie-universal'
import QRCode from "qrcode"




export default function Instructor() {
    const cookie = new Cookie();
    const [subjects, setSubjects] = useState([])
    const [qr, setQr] = useState("")
    const [message, setMessage] = useState('')
    const userId = cookie.get("userId");
    const date = new Date();

    useEffect(() => {
            Axios.get(`${getAllSubjectsOfInstructor}/${userId}`)
            .then(res=>setSubjects(res.data))
            .catch((error)=>console.log(error))
    }, [])

    async function handelGenrateSession(id){
        await Axios.post(`${generateSession}/${id}`, {userId: userId})
            .then(res=>{
                QRCode.toDataURL(res.data.session)
                .then(url =>{ 
                    setQr(url)
                    setMessage("The QR Code Created Successfuly")
                })
                .catch(err => {
                    setMessage("The QR Code Is Not Create")
                    console.error(err)
                })
            })
            .catch((err)=>{
            try {
                if (err.response) {
                    setMessage(err.response)
                }
                setMessage(err.message)
            } catch (error) {
                console.log(error)
            }
            }
            )
    }

    async function handelReport(id){
        await Axios.get(getAllReports, {
            params: {
                month: (date.getMonth() + 1),
                year:  date.getFullYear(),
                subjectId: id
            }
        })
        .then(res=>{
            console.log(res)
        })
        .catch((err)=>{
        try {
            if (err.response) {
                setMessage(err.response)
            }
            setMessage(err.message)
        } catch (error) {
            console.log(error)
        }
        }
        )
    }

    return (
        <div className="w-screen min-h-screen text-white flex p-2 flex-col">
        <Table>
        <TableCaption className="text-white">A list of your recent invoices.</TableCaption>
        <TableCaption className="text-white">{message}</TableCaption>
        <TableHeader>
            <TableRow>
            <TableHead className="text-white">ID</TableHead>
            <TableHead className="text-white">Name</TableHead>
            <TableHead className="text-white">Department</TableHead>
            <TableHead className="text-white">Stage</TableHead>
            <TableHead className="text-white flex justify-center items-center">Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {
            subjects.length > 0 
            ?
            subjects.map((subject, index) => (
            <TableRow key={subject._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{subject.name}</TableCell>
                <TableCell>{subject.department}</TableCell>
                <TableCell>{subject.stage}</TableCell>
                <TableCell className="flex justify-center items-center">
                    <div className="flex justify-start items-center gap-1">
                        <Button variant="destructive" onClick={()=>handelGenrateSession(subject._id)}>Create Lecture</Button>
                        <Button variant="secondary" onClick={()=>handelReport(subject._id)}>Get Report</Button>
                    </div>
                </TableCell>
            </TableRow>
            ))
            :
            <>
            <TableRow>
                <TableCell> <Skeleton className="h-4 w-[200px]" /> </TableCell>
                <TableCell> <Skeleton className="h-4 w-[200px]" /> </TableCell>
                <TableCell> <Skeleton className="h-4 w-[200px]" /> </TableCell>
                <TableCell> <Skeleton className="h-4 w-[200px]" /> </TableCell>
                <TableCell> <Skeleton className="h-4 w-[200px]" /> </TableCell>
            </TableRow>
            <TableRow>
                <TableCell> <Skeleton className="h-4 w-[200px]" /> </TableCell>
                <TableCell> <Skeleton className="h-4 w-[200px]" /> </TableCell>
                <TableCell> <Skeleton className="h-4 w-[200px]" /> </TableCell>
                <TableCell> <Skeleton className="h-4 w-[200px]" /> </TableCell>
                <TableCell> <Skeleton className="h-4 w-[200px]" /> </TableCell>
            </TableRow>
            </>
            }
        </TableBody>
        <TableFooter>
            <TableRow>
            {/* <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell> */}
            </TableRow>
        </TableFooter>
        </Table>
        {qr && <img className="w-80 h-80" src={qr} alt="QR Code" />}
    </div>
    )
}
