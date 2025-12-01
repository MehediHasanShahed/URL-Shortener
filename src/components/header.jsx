import { Link, useNavigate } from 'react-router-dom'
import React from 'react'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { LinkIcon, LogOut } from 'lucide-react'
import { UrlState } from '@/context'
import useFetch from '@/hooks/use-fetch'
import { logout } from '@/db/apiAuth'
import { BarLoader } from 'react-spinners'

const Header = () => {

    const navigate = useNavigate()
    
    const {user, fetchUser} = UrlState()

    const {loading, fn: fnLogout} = useFetch(logout)

    return (
    <>
    <nav className='py-4 flex justify-between items-center'>
        <Link to='/'>
        <img src='/logo.png' className='h-12' alt='URL Shortener Logo'/>
        </Link>

        <div>
            {!user ?
            <Button onClick={()=>navigate('/auth')}>Login</Button>
             : (
                <DropdownMenu>
                    <DropdownMenuTrigger className="rounded-full outline-none hover:ring-2 hover:ring-yellow-400 hover:ring-offset-2 hover:ring-offset-background">
                        <Avatar>
                            <AvatarImage src={user?.user_metadata?.profile_pic} className='object-contain'/>
                            <AvatarFallback>US</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent >
                        <DropdownMenuLabel className='flex items-center justify-center'>{user?.user_metadata?.name}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className='flex items-center justify-center'>
                            <Link to='/dashboard' className='flex'>
                                <LinkIcon className='h-4 w-4 mr-1.5' />
                                My Links
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className='flex flex-row items-center justify-center text-red-400'>
                            <LogOut className='h-4 w-4 text-red-400'/>
                            <span onClick={() => {
                                fnLogout().then(()=>{
                                    fetchUser()
                                    navigate('/')
                                })
                            }}>Logout</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
             )
            }
        </div>
    </nav>
    {loading && <BarLoader className='mb-4' width={'100%'} color='#36d7b7'/>}
    </>
    )
}

export default Header