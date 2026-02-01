import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';

export default function Profile() {
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const { currentUser } = useSelector((state) => state.user);
  const handleFileUpload = async (file) => {
    console.log('Uploading file:', file);
    // Implement your file upload logic here
// added upload percentage tracking
// add succefully added notification and error handling
  };

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);


  return (
    <div className='p-3 maw-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col max-w-md mx-auto border-2 border-slate-400 p-5 rounded-lg'>
        <input
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
          onChange={(e) => setImage(e.target.files[0])}
        />

        <img
          src={image ? URL.createObjectURL(image) : currentUser.profilePicture}
          alt='Profile Picture'
          className='w-24 h-24 self-center rounded-full object-cover cursor-pointer mt-2'
          onClick={() => fileRef.current.click()}
        />

        <input
          type='text'
          id='username'
          defaultValue={currentUser.username}
          placeholder='Username'
          className='border border-slate-400 p-2 rounded-lg my-2 focus:outline-none'
        />

        <input
          type='email'
          id='email'
          defaultValue={currentUser.email}
          placeholder='Email'
          className='border border-slate-400 p-2 rounded-lg my-2  focus:outline-none'
        />

        <input
          type='password'
          id='password'
          placeholder='Password'
          className='border border-slate-400 p-2 rounded-lg my-2 focus:outline-none'
        />
        <button className='uppercase bg-blue-500 text-white py-2 px-4 rounded-lg mt-2 hover:opacity-85'>
          Update
        </button>

        <div className='flex justify-between mt-5'>
          <span className='cursor-pointer text-red-700 hover:underline'>
            Delete Account
          </span>

          <span className='cursor-pointer text-red-700 hover:underline'>
            Sign Out
          </span>
        </div>
      </form>
    </div>
  );
}
