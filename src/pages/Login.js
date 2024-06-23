import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth(); // Access login function from AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/login', {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, user } = response.data;
        console.log(user);
    localStorage.setItem('token', token);
    localStorage.setItem('userToken',user)
    login(user); // Set user data in context after successful login
    router.push('/'); // Red // Redirect to dashboard or desired page upon successful login
      }
    } catch (error) {
      setError('Invalid email or password');
    }
  };
  return (
    <>
      <Head>
        <style>{`
          .bg-image {
            background-image: url('https://img.freepik.com/free-photo/top-view-bowls-with-coffee-beans-powder_23-2148937321.jpg?size=626&ext=jpg');
            background-size: cover;
            background-position: center;
          }
        `}</style>
      </Head>
      <section className="vh-100 bg-image">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
                <div className="card-body p-5 text-center">
                  <h3 className="mb-5">Sign in</h3>
                  {error && <p className="text-danger">{error}</p>}
                  <form onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                      />
                    </div>
                    <button className="btn btn-primary btn-lg btn-block" type="submit">Login</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Login;
