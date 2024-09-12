import { useState } from "react"
import { signup } from "../../helpers/helper"
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // console.log(position.coords)
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          setError('Error getting location');
          console.error('Geolocation error:', error);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };
  
  const navigate = useNavigate()

  const handleSubmit = async () => {


    if (!location.latitude || !location.longitude) {
      getLocation()
      return;
    }

    try {
      const data = await signup(name, email, password, location.latitude, location.longitude);
      console.log('Signup successful:', data);
      localStorage.setItem('atoken', data?.token)
      setTimeout(() => {
        navigate("/")
      }, 2000);
      toast.success("Signup Successfully.")
      // Redirect or show success message
    } catch (err) {
      setError(err.msg || 'Signup failed');
      toast.error("Signup unsuccessfully.")
    }
  };


  return (
    <div className="login__parent">
      <form onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }} className="login__child">
        <h1 className="title_1 mb">Sign up</h1>
        <input
          required
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          type="text"
          className="search-field"

        />
        <input
          required
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          type="email"
          className="search-field"

        />
        <input
          required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="search-field"

        />
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
          <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ color: 'white', display: 'flex', gap: '10px' }}>Already have an account? <Link style={{ textDecoration: 'underline' }} to="/login">Sign in</Link></p>
            <button type="submit" style={{ width: '100%' }} className="btn-primary">
              Sign up
            </button>
          </div>
        </div>
      </form>
    </div >
  )
}

export default Signup