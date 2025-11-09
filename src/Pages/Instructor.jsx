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
    const [reports, setReports] = useState([])
    const [message, setMessage] = useState('')
    const userId = cookie.get("userId");
    const date = new Date();

    //get All Subjects Of Instructor
    useEffect(() => {
            setMessage("")
            Axios.get(`${getAllSubjectsOfInstructor}/${userId}`)
            .then(res=>setSubjects(res.data))
            .catch((err)=>{
                try {
                    if (err.response) {
                        setMessage(err.response.data.message)
                    } else{
                    setMessage(err.message)
                    }
                } catch (error) {
                    console.log(error)
                }
            }
            )
    }, [])

    async function handelGenrateSession(id){
        setMessage("")
        setReports("")
        await Axios.post(`${generateSession}/${id}`, {userId: userId})
            .then(res=>{
                QRCode.toDataURL(res.data.session)
                .then(url =>{ 
                    setMessage("The QR Code Created Successfuly")
                    window.open(`/qr-view?img=${encodeURIComponent(url)}`, "_blank");
                })
                .catch(err => {
                    setMessage("The QR Code Is Not Create")
                    console.error(err)
                })
            })
            .catch((err)=>{
            try {
                if (err.response) {
                    setMessage(err.response.data.message)
                } else{
                setMessage(err.message)
                }
            } catch (error) {
                console.log(error)
            }
            }
            )
    }

    async function handelReport(id){
        setMessage("")
        await Axios.get(getAllReports, {
            params: {
                month: (date.getMonth() + 1),
                year:  date.getFullYear(),
                subjectId: id
            }
        })
        .then(res=>{
            setReports(res.data)
        })
        .catch((err)=>{
        try {
            if (err.response) {
                setMessage(err.response.data.message)
            } else{
            setMessage(err.message)
            }
        } catch (error) {
            console.log(error)
        }
        }
        )
    }

    return (
        <div className="w-screen min-h-screen text-white flex p-2 flex-col">
        <Table>
        <TableCaption className="text-white">List Of All Your Subjects.</TableCaption>
        <TableCaption className="text-white">{message}</TableCaption>
        <TableHeader>
            <TableRow>
            <TableHead className="text-white">No.</TableHead>
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
            </TableRow>
        </TableFooter>
        </Table>
        {
        (reports.length !== 0)
        &&
        <Table>
        <TableCaption className="text-white">Monthly Attendance Report</TableCaption>
        <TableCaption className="text-white">{message}</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead className="text-white">No.</TableHead>
                <TableHead className="text-white">Student Name</TableHead>
                <TableHead className="text-white">Present</TableHead>
                <TableHead className="text-white">Absent</TableHead>
                <TableHead className="text-white">Leave</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {
            (reports.length !== 0)
            &&
            reports?.report?.map((item, index) => (
            <TableRow key={item.studentId}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.studentName}</TableCell>
                <TableCell>{item.present}</TableCell>
                <TableCell>{item.absent}</TableCell>
                <TableCell>{item.leave}</TableCell>
            </TableRow>
            ))
        }
        </TableBody>
        <TableFooter>
            <TableRow>
            <TableCell colSpan={5}>Total Lecture</TableCell>
            <TableCell className="text-right">{reports.totalSessions}</TableCell>
            </TableRow>
            <TableRow>
            <TableCell colSpan={5}>Month / Year</TableCell>
            <TableCell className="text-right">{reports.month}/{reports.year}</TableCell>
            </TableRow>
        </TableFooter>
        </Table>
        }
    </div>
    )
}
