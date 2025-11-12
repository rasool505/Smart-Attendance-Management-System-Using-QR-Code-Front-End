import { getAllInstructors, getAllStudents, subject, usersURL } from "@/Api/Api";
import { Axios } from "@/Api/AxiosCreate";
import { Button } from "@/Components/ui/button";
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
import {  useState } from "react"

export default function Users(){
    const [users, setUsers] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [message, setMessage] = useState('');
    const [path, setPath] = useState(0);


    async function handleGetSubjects() {
            setUsers([])
            setMessage("")
            Axios.get(subject)
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
    }
    async function handleGetStudents() {
            setMessage("")
            setPath(1)
            Axios.get(getAllStudents)
            .then(res=>setUsers(res.data))
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

    async function handleGetInstructors() {
            setMessage("")
            setPath(2)
            Axios.get(getAllInstructors)
            .then(res=>setUsers(res.data))
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

    async function handleDelete(userId){
        setSubjects([])
        setMessage("")
        await Axios.delete(`${usersURL}/${userId}`)
        .then(()=>{
            if (path === 1) {
                handleGetStudents();
            } else{
                handleGetInstructors();
            }
            }
        )
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

    async function handleDeleteSubject(subjectId){
        setUsers([])
        setMessage("")
        await Axios.delete(`${subject}/${subjectId}`)
        .then(()=>handleGetSubjects())
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
            <div className="flex justify-center items-center flex-col w-full">
                <div className="w-full h-fit mb-4">
                <header className="w-full h-4">
                    <nav className="flex justify-items-start items-center p-1.5 gap-5">
                        <h1 className="scroll-m-20 text-center font-extrabold tracking-tight text-balance">ATTENDIFY</h1>
                        <Button variant="link" className="text-white" onClick={()=>handleGetStudents()}>Students</Button>
                        <Button variant="link" className="text-white" onClick={()=>handleGetInstructors()}>Instructors</Button>
                        <Button variant="link" className="text-white" onClick={()=>handleGetSubjects()}>Subjects</Button>
                    </nav>
                </header>
                </div>
                {
                (users.length !== 0)
                ?
                <div className="w-full h-fit flex p-2">
                    <Table className="min-w-full">
                        <TableCaption className="text-white">{message}</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-white">No.</TableHead>
                                <TableHead className="text-white">Name</TableHead>
                                <TableHead className="text-white">Email</TableHead>
                                <TableHead className="text-white">Stage</TableHead>
                                <TableHead className="text-white">Department</TableHead>
                                <TableHead className="text-white">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                            users.map((item, index) => (
                            <TableRow key={item._id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{item.stage}</TableCell>
                                <TableCell>{item.department}</TableCell>
                                <TableCell className="flex gap-2">
                                <Button className="bg-emerald-500 hover:bg-emerald-700 font-medium">Update</Button>
                                <Button 
                                className="bg-destructive text-white hover:bg-destructive/90 font-medium"
                                onClick={()=>handleDelete(item._id)}
                                >Delete</Button>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                        </TableFooter>
                    </Table>
                </div>
                : (subjects.length !== 0) &&
                <div className="w-full h-fit flex p-2">
                    <Table className="min-w-full">
                        <TableCaption className="text-white">{message}</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-white">No.</TableHead>
                                <TableHead className="text-white">Name</TableHead>
                                <TableHead className="text-white">Instructor</TableHead>
                                <TableHead className="text-white">Stage</TableHead>
                                <TableHead className="text-white">Department</TableHead>
                                <TableHead className="text-white">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                            subjects.map((item, index) => (
                            <TableRow key={item._id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.instructor?.name}</TableCell>
                                <TableCell>{item.stage}</TableCell>
                                <TableCell>{item.department}</TableCell>
                                <TableCell className="flex gap-2">
                                <Button 
                                className="bg-destructive text-white hover:bg-destructive/90 font-medium"
                                onClick={()=>handleDeleteSubject(item._id)}
                                >Delete</Button>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                        </TableFooter>
                    </Table>
                </div>
                }
            </div>
    )
}