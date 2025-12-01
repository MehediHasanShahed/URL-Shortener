import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from './ui/input'
import { Label } from '@radix-ui/react-dropdown-menu'
import { Button } from './ui/button'
import { ScaleLoader } from 'react-spinners'
import Error from './error'
import * as Yup from 'yup'
import useFetch from '@/hooks/use-fetch'
import { login} from '@/db/apiAuth'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { UrlState } from '@/context'

const Login = () => {
    const [errors, setErrors] = useState({})
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const navigate = useNavigate()
    let [searchParams] = useSearchParams()
    const longLink = searchParams.get('createNew')

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const { data, error, loading, fn: fnLogin} = useFetch(login, formData)
    const {fetchUser} = UrlState()

    useEffect(() => {
        if (error === null && data) {
            fetchUser()
            navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ''}`)
       }
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, error])

    const handleLogin = async () => {
        setErrors([])
        try {
            const schema = Yup.object().shape({
                email: Yup.string()
                    .email('Invalid Email')
                    .required('Email is Required'),
                password: Yup.string()
                    .min(6, 'Password must be at least 6 characters')
                    .required('Password is Required'),
            })

            await schema.validate(formData, {abortEarly: false})
            //api call
            await fnLogin()
        } catch (error) {
            const newErrors = {}

            error?.inner?.forEach((err) => {
                newErrors[err.path] = err.message
            })

            setErrors(newErrors)
        }
    }

  return (
    <Card>
        <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>to your account if you already have one</CardDescription>
            {error && <Error message={error.message}/>}
        </CardHeader>
        <CardContent className='space-y-2'>
            <div className='space-y-1'>
                <Label>Email</Label>
                <Input name='email' type='email' placeholder='Enter your email address' onChange={handleInputChange}/>
                {errors.email && <Error message={errors.email}/>}
            </div>
            <div className='space-y-1'>
                <Label>Password</Label>
                <Input name='password' type='password' placeholder='Enter your password' onChange={handleInputChange}/>
                {errors.password && <Error message={errors.password}/>}
            </div>
        </CardContent>
        <CardFooter>
            <Button onClick={handleLogin}>
                {loading ? (
                    <>
                        <ScaleLoader color="#040c57" height={17} />
                        <span className="ml-2">Logging In...</span>
                    </>
                ) : (
                    'Login'
                )}  
            </Button>
        </CardFooter>
    </Card>
  )
}

export default Login