import React from 'react'
import { useRef, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'

const Manager = () => {
  const ref = useRef()
  const passwordRef = useRef()
  const [form, setForm] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setPasswordArray] = useState([])

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords))
    }
  }, [])

  const savetoLocalStorage = (updatedPasswords) => {
    localStorage.setItem('passwords', JSON.stringify(updatedPasswords))
  }

  const showPassword = () => {
    if (ref.current.src.includes('icons/hide.png')) {
      ref.current.src = 'icons/eye.png'
      passwordRef.current.type = 'text'
    } else {
      ref.current.src = 'icons/hide.png'
      passwordRef.current.type = 'password'
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const savePassword = () => {
    toast('All values should have length should be greater than 3', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
      localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
      setForm({ site: '', username: '', password: '' })
    }
  }

  const handleEdit = (e, id) => {
    const p = passwordArray.find((item) => item.id === id)
    setForm(p)
    const newPasswords = passwordArray.filter((e) => e.id !== id)
    setPasswordArray(newPasswords)
    savetoLocalStorage(newPasswords)
  }

  const handleDelete = (e, id) => {
    const newPasswords = passwordArray.filter((e) => e.id !== id)
    setPasswordArray(newPasswords)
    savetoLocalStorage(newPasswords)
  }

  const copyText = (text) => {
    toast('Copied to clipboard', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text)
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>

      <div className="p-2 md:p-0 md:mycontainer">
        <h1 className='text-4xl font-bold text-center'>
          <span className='text-green-700'>&lt;</span>Green <span className='text-green-700'> Couch/&gt;</span>
        </h1>
        <p className='text-green-900 text-lg text-center'>Your own password manager</p>

        <div className='text-black flex flex-col gap-8 p-4 items-center'>
          <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border border-green-500 w-full text-black p-4 py-1' type="text" name='site' id='site' />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input value={form.username} onChange={handleChange} placeholder='Enter username' className='rounded-full border border-green-500 w-full text-black p-4 py-1' type="text" name='username' id='username' />
            <div className="relative">
              <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter password' className='rounded-full border border-green-500 w-full text-black p-4 py-1' type="password" name='password' id='password' />
              <span className='absolute right-1 top-[1px] cursor-pointer' onClick={showPassword}>
                <img ref={ref} src="icons/hide.png" className='p-2' width={30} alt="eye" /></span>
            </div>
          </div>
          <button className='flex items-center justify-center rounded-full bg-green-500 px-8 py-2 gap-2 w-fit border border-green-900 hover:bg-green-400' onClick={savePassword}>
            <lord-icon
              src="https://cdn.lordicon.com/efxgwrkc.json"
              trigger="hover">
            </lord-icon>
            Save
          </button>
        </div>

        <div className="passwords">
          <h2 className='font-bold text-2xl py-4 px-4'>Saved Passwords</h2>
          {passwordArray.length === 0 && <div className='px-4'>No passwords saved.</div>}
          {passwordArray.length != 0 &&
            <table className="table-auto w-full rounded-md overflow-hidden">
              <thead className='bg-green-800 text-white'>
                <tr>
                  <th className='py-2'>Site</th>
                  <th className='py-2'>Username</th>
                  <th className='py-2'>Password</th>
                  <th className='py-2'>Actions</th>
                </tr>
              </thead>
              <tbody className='bg-green-100'>
                {passwordArray.map((item, index) => {
                  return (
                    <>
                      <tr key={index}>
                        <td className='py-2 border border-white text-center'>
                          <div className='flex items-center justify-center'>
                            <a href={item.site} target='_blank'>{item.site}</a>
                            <img className='cursor-pointer pt-1 pl-2' width="20" height="20" src="https://img.icons8.com/material-rounded/24/copy.png" alt="copy" onClick={() => { copyText(item.site) }} />
                          </div>
                        </td>
                        <td className='py-2 border border-white text-center'>
                          <div className='flex items-center justify-center'>
                            {item.username}
                            <img className='cursor-pointer pt-1 pl-2' width="20" height="20" src="https://img.icons8.com/material-rounded/24/copy.png" alt="copy" onClick={() => { copyText(item.username) }} />
                          </div>
                        </td>
                        <td className='py-2 border border-white text-center'>
                          <div className='flex items-center justify-center'>
                            {item.password}
                            <img className='cursor-pointer pt-1 pl-2' width="20" height="20" src="https://img.icons8.com/material-rounded/24/copy.png" alt="copy" onClick={() => { copyText(item.password) }} />
                          </div>
                        </td>
                        <td className='py-2 border border-white text-center'>
                          <div className='flex items-center justify-center'>
                            <span className='cursor-pointer' onClick={(e) => handleEdit(e, item.id)}>
                              <lord-icon
                                src="https://cdn.lordicon.com/tobsqthh.json"
                                trigger="hover"
                                colors="primary:#16c72e,secondary:#000000,tertiary:#242424">
                              </lord-icon>
                            </span>
                            <span className='cursor-pointer' onClick={(e) => handleDelete(e, item.id)}>
                              <lord-icon
                                src="https://cdn.lordicon.com/nhqwlgwt.json"
                                trigger="hover"
                                colors="primary:#121331,secondary:#16c72e,tertiary:#646e78,quaternary:#ebe6ef">
                              </lord-icon>
                            </span>
                          </div>
                        </td>
                      </tr>
                    </>
                  )
                })}
              </tbody>
            </table>
          }
        </div>
      </div >
    </>
  )
}

export default Manager
