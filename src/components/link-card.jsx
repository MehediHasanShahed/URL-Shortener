/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { Copy, Download, Trash2 } from 'lucide-react'
import useFetch from '@/hooks/use-fetch'
import { deleteUrl } from '@/db/apiUrls'
import { ScaleLoader } from 'react-spinners'
import { toast } from 'sonner'

const LinkCard = ({url, fetchUrls}) => {
    const short = import.meta.env.VITE_URL_SHORTENER

    const downloadImage = async () => {
        const imageUrl = url?.qr
        const fileName = url?.title || "qr"

        try {
            const response = await fetch(imageUrl)
            const blob = await response.blob()

            const blobUrl = window.URL.createObjectURL(blob)

            const link = document.createElement("a")
            link.href = blobUrl
            link.download = `${fileName}.png`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)

            window.URL.revokeObjectURL(blobUrl)
        } catch (error) {
            console.error("Download failed", error)
        }
    }

    const {loading: loadingDelete, fn: fnDelete} = useFetch(deleteUrl, url?.id)

  return (
    <div className='flex flex-col md:flex-row gap-5 border p-4 bg-gray-900 rounded-lg'>
        <img src={url?.qr} className='h-32 object-contain ring ring-blue-500 self-start' alt='qr code'/>
        <Link to={`/link/${url?.id}`} className='flex flex-col flex-1'>
            <span className='text-3xl font-extrabold hover:underline cursor-pointer'>
                {url.title}
            </span>
            <span className='text-2xl text-blue-400 font-bold hover:underline cursor-pointer'>
                {url?.custom_url ? short+url?.custom_url : short+url.short_url}
            </span>
            <span className='flex items-center gap-1 hover:underline cursor-pointer'>
                {url.original_url}
            </span>
            <span className='flex items-end font-extralight text-sm flex-1'>
                {new Date(url.created_at).toLocaleString()}
            </span>
        </Link>

        <div className='flex gap-2'>
            <Button
                variant="ghost"
                onClick={() => {
                    navigator.clipboard.writeText(`${short + url?.short_url}`)
                    toast.success('Link copied!')
                }}
            >
                <Copy/>
            </Button>
            <Button variant='ghost' onClick={downloadImage}>
                <Download/>
            </Button>
            <Button variant='ghost' onClick={()=>fnDelete().then(()=>fetchUrls())}>
                {loadingDelete?<ScaleLoader color="white" height={8} />:<Trash2/>}
            </Button>
        </div>
    </div>
  )
}

export default LinkCard