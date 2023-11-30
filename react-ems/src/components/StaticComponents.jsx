import React from 'react'

export const HeaderComponent = () => {
  return (
        <header className='text-white mb-7'>
            <nav className='flex flex-nowrap items-center bg-blue-950 p-5'>
                <a className='text-xl font-bold mr-3 hover:underline-offset-4 hover:underline' href='/'>Employee Management System</a>
                <ul className='list-none flex flex-nowrap space-x-0.5 bg-blue-950 text-white justify-center'>
                    <a href='/departments/'><li className='px-6 py-2 hover:bg-blue-700 rounded active:bg-blue-800'>Departments</li></a>
                    <a href='/employees/'><li className='px-6 py-2 hover:bg-blue-700 rounded active:bg-blue-800'>Employees</li></a>
                </ul>
                <button className='ml-auto px-6 py-2 rounded bg-blue-700 hover:bg-blue-500'>Login</button>
            </nav>
        </header>
  )
}

export const FooterComponent = () => {
    return (
        <footer className=' bg-blue-950 text-white w-full h-20 flex flex-nowrap text-center py-3'>
            <div className="copyright mx-auto ">
                bla-bla © All rights reserved
            </div>
        </footer>
    )
}
