import { useState } from 'react'
import { IoMoonOutline, IoMoonSharp } from 'react-icons/io5'

export default function Toggle() {
  const [darkMode, setDarkMode] = useState(false)

  const changeTheme = () => {
    document.body.classList.toggle('dark')
    setDarkMode(!darkMode)
  }

  return (
    <>
      <button onClick={changeTheme}>
        {darkMode ? (
          <div className='flex items-center'>
            <IoMoonSharp className='text-white' />
            <h3 className='p-2 text-white'>Light Mode</h3>
          </div>
        ) : (
          <div className='flex items-center'>
            <IoMoonOutline className='text-gray-900' />
            <h3 className='p-2'>Dark Mode</h3>
          </div>
        )}
      </button>
    </>
  )
}
