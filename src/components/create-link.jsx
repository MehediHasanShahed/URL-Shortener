import { UrlState } from '@/context'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import Error from './error'
import { Label } from '@radix-ui/react-dropdown-menu'
import { Card } from './ui/card'
import * as yup from 'yup'
import useFetch from '@/hooks/use-fetch'
import QRCode from 'react-qrcode-logo'
import { createUrl } from '@/db/apiUrls'
import { ScaleLoader } from 'react-spinners'

const CreateLink = () => {
    const shortener = import.meta.env.VITE_URL_SHORTENER

    const {user} = UrlState()
    const navigate = useNavigate()
    let [searchParams, setSearchParams] = useSearchParams()
    const longLink = searchParams.get('createNew')
    const ref = useRef()
    
    const [errors, setErrors] = useState({})
    const [formValues, setFormValues] = useState({
        title: '',
        longUrl: longLink ? longLink : '',
        customUrl: '',
    })

    const schema = yup.object().shape({
        title: yup.string().required('Title is required'),
        longUrl: yup.string().url('Must be a valid URL').required('Long URL is required'),
        customUrl: yup.string(),
    })

    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.id]: e.target.value,
        })
    }

    const {loading, error, data, fn: fnCreateUrl} = useFetch(createUrl,{...formValues, user_id: user.id})

    const createNewLink = async () => {
        setErrors([])
        try {
            await schema.validate(formValues, {abortEarly: false})
            const canvas = ref.current.canvasRef.current
            const blob = await new Promise((resolve) => canvas.toBlob(resolve))
            await fnCreateUrl(blob)
        } catch (error) {
            const newErrors = {}

            error?.inner?.forEach((err)=>{
                newErrors[err.path] = err.message
            })
            setErrors(newErrors)
        }
    }

    useEffect(() => {
        if(error===null && data) {
            navigate(`/link/${data[0].id}`)
        }
    }, [error, data])

    return (
    <div>
        <Dialog defaultOpen={longLink} onOpenChange={(res)=> {if(!res) setSearchParams({})}}>
            <DialogTrigger>
                <Button variant='destructive'>Create New Link</Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-md'>
                <DialogHeader>
                    <DialogTitle className='font-bold text-2xl'>Create New</DialogTitle>
                </DialogHeader>

                {formValues?.longUrl && <QRCode value={formValues?.longUrl} size={250} ref={ref}/>}

                <Label>Title</Label>
                <Input id='title' placeholder="Short Link's Title" value={formValues.title} onChange={handleChange}/>
                {errors.title && <Error message={errors.title}/>}

                <Label>URL</Label>
                <Input id='longUrl' placeholder="Enter your Loooong URL" value={formValues.longUrl} onChange={handleChange}/>
                {errors.longUrl && <Error message={errors.longUrl}/>}
              
                    <Label>Custom URL</Label>
                <div className='flex items-center gap-2'>
                    <Card className='p-2'>URL Shortener</Card>/
                    <Input id='customUrl' placeholder="Custom Link (optional)" value={formValues.customUrl} onChange={handleChange}/>
                </div>
                    {error && <Error message={error.message}/>}

                <DialogFooter className='sm:justify-center'>
                    <Button disabled={loading} onClick={createNewLink} variant='destructive'>{loading?<ScaleLoader color="white" height={8} />:'Create Link'}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
    )
}

export default CreateLink