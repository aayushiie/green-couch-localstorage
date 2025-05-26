import React from 'react'

const Navbar = () => {
  return (
    <nav className=' bg-slate-800 text-white'>
      <div className='mycontainer flex justify-between items-center px-4 py-5 h-14'>
        <div className="logo font-bold text-white text-2xl">
          <span className='text-green-700'>&lt;</span>Green <span className='text-green-700'>Couch/&gt;</span>
        </div>
        <ul>
          <li className='flex gap-4'>
            <a className=' transition-all hover:-translate-y-0.5 ' href="/"><img width="26" height="26" src="https://img.icons8.com/ios-filled/50/FFFFFF/github.png" alt="github"/></a>
          </li>
        </ul>
      </div>

    </nav>
  )
}

export default Navbar
