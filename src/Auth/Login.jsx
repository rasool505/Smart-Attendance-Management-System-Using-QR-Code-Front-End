import { AxiosNoToken } from "../Api/AxiosCreate"
import { useEffect, useState } from "react"
import Cookie from 'cookie-universal'
import { loginURL, verifyOTPURL } from "../Api/Api";
import {
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"
import { MailIcon } from "lucide-react";

import { REGEXP_ONLY_DIGITS } from "input-otp"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { Progress } from "@/components/ui/progress"

export default function Login(){    
    const cookie = new Cookie();
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [timeLeft, setTimeLeft] = useState(120)
    const [otp, setOtp] = useState(false)

    useEffect(() => {
        if(otp){
            if (timeLeft <= 0) return;
            const timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [timeLeft, otp]);
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    async function Submit(e){
        e.preventDefault();
        setLoading(true)
        await AxiosNoToken.post(loginURL, {
            email: email.toLocaleLowerCase().trim()
        })
        .then(()=>{
            setLoading(false)
            setOtp(true)
            setTimeLeft(120)
            setMessage('')
            
        })
        .catch(err=>{
            try {
                if (err.response) {
                    setMessage(err.response)
                }
                setMessage(err.message)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.log(error)
            }
            
        })
    }

    async function SubmitOTP(e){
        e.preventDefault();
        setLoading(true)
        await AxiosNoToken.post(verifyOTPURL, {
            email: email.toLocaleLowerCase().trim(),
            code: code
        })
        .then(data=>{
            setMessage(data.data.message)
            cookie.set("userId", data.data.userId);
            cookie.set("userRole", data.data.userRole);
            cookie.set("accessToken", data.data.token);
            setLoading(false)
            setOtp(true)
        })
        .catch(err=>{
            try {
                if (err.response) {
                    setMessage(err.response)
                }
                setMessage(err.message)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.log(error)
            }
        })
    }


return (
    <div className="@container w-full min-h-screen flex justify-center items-center p-4">
    {
    !otp
    ?
    <div className="w-96 @lg:w-md outline-2 pt-24 pb-24 p-5 rounded-sm text-white">
        <form onSubmit={Submit}>
        <FieldSet>
            <FieldGroup>
            <FieldLegend className="text-white">Login To Your Account</FieldLegend>
            <FieldDescription>
                All transactions are secure and encrypted
            </FieldDescription>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <InputGroup>
                <InputGroupInput 
                id="email" 
                name="email" 
                type="email" 
                placeholder="example@email.com" 
                value={email} 
                onChange={(e)=>setEmail(e.target.value)} 
                required 
                autoFocus
                />
                <InputGroupAddon>
                <MailIcon/>
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">
                {loading && <Spinner />}
                </InputGroupAddon>
                </InputGroup>
                <FieldDescription>
                { message }
                </FieldDescription>
                <Button type="submit" variant="secondary" disabled={loading}>Submit</Button>
            </FieldGroup>
        </FieldSet>
        </form>
    </div>
    :
    <div className="w-96 @lg:w-md outline-2 pt-24 pb-24 p-5 rounded-sm text-white">
        <form onSubmit={SubmitOTP}>
        <FieldSet>
            <FieldGroup>
            <FieldLegend className="text-white">Login To Your Account</FieldLegend>
            <FieldDescription>
                All transactions are secure and encrypted
            </FieldDescription>
                <div className="w-full flex justify-center items-center flex-col">
                <InputOTP
                maxLength={4}
                pattern={REGEXP_ONLY_DIGITS}
                value={code} 
                onChange={(e)=>setCode(e)}
                autoFocus
                >
                <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                </InputOTPGroup>
                </InputOTP>
                </div>
                
                <FieldDescription className="flex justify-center items-center gap-0.5">
                    <Progress value={timeLeft} className="w-[60%] [&_[data-slot=progress-indicator]]:bg-white" />
                    {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </FieldDescription>
                {
                    timeLeft > 0 && <FieldDescription className="flex justify-center items-center">Time Remaining</FieldDescription>
                }
                <FieldDescription>
                { message }
                </FieldDescription>
                {
                timeLeft <= 0
                ?
                <Button type="submit" variant="secondary" disabled={loading} onClick={Submit}>Resend The Code</Button>
                :
                <Button type="submit" variant="secondary" disabled={loading}>Submit</Button>
                }
            </FieldGroup>
        </FieldSet>
        </form>
    </div>
    }
    </div>
    )
}
