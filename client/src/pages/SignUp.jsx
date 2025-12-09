import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto border-slate-400 border-2 rounded-lg mt-10'>
<h1 className='text-3xl text-center font-semibold my-7'>SignUp</h1>
<form className='flex flex-col gap-4 '>
<input className=' bg-slate-100 p-3 rounded-lg' type='text' placeholder='Username' id='username'></input>
<input className=' bg-slate-100 p-3 rounded-lg' type='email' placeholder='Email' id='email'></input>
<input className=' bg-slate-100 p-3 rounded-lg' type='password' placeholder='Password' id='password'></input>

<button  className=' bg-blue-600 text-white p-3 rounded-lg mt-4 hover:bg-blue-700 transition disabled:opacity-80'>SignUp</button>
<div className='flex gap-2 mt-5'>
<p>Have an account ?</p>
<Link to='/sign-in'>
<span className='text-blue-700'>Sign in</span>
</Link>
</div>
</form>
</div>
  )
}
