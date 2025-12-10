import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior page dont reload

    try {
      setLoading(true);
      setError(false);
      const res = await fetch(`/api/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
navigate('/');
    } catch (error) {
      setLoading(false);
      setError(true);

      console.error('Error during signup:', error);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto border-slate-400 border-2 rounded-lg mt-10'>
      <h1 className='text-3xl text-center font-semibold my-7'>SignIn</h1>
      <form className='flex flex-col gap-4 ' onSubmit={handleSubmit}>
        <input
          className=' bg-slate-100 p-3 rounded-lg focus : outline-none'
          type='email'
          placeholder='Email'
          id='email'
          onChange={handleChange}
        ></input>
        <input
          className=' bg-slate-100 p-3 rounded-lg focus : outline-none '
          type='password'
          placeholder='Password'
          id='password'
          onChange={handleChange}
        ></input>

        <button
          disabled={loading}
          className=' bg-blue-600 text-white p-3 rounded-lg mt-4 hover:bg-blue-700 transition disabled:opacity-80'
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
        <div className='flex gap-2 mt-5'>
          <p>Dont have an account ?</p>
          <Link to='/sign-up'>
            <span className='text-blue-700'>Sign up</span>
          </Link>
        </div>
        <p className='text-red-700 mt-5'>{error && 'Something went wrong!'}</p>
      </form>
    </div>
  );
}
