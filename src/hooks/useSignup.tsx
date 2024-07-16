import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import { ISignUpInputs } from '../types/types'
import toast from 'react-hot-toast'

const useSignup = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const { setAuthUser } = useAuthContext()

    const signup = async (inputs: ISignUpInputs) => {
        try {
            console.log(inputs)
            setLoading(true)
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...inputs }),
            })
            const data = await res.json()
            // localStorage.setItem('token', data.token);
            if (!res.ok) throw new Error(data.error);
            setAuthUser(data)

        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    return { loading, signup }
}

export default useSignup