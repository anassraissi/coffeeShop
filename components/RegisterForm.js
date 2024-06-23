import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const RegisterForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer'); // Default role
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
console.log(email);
    try {
      const response = await axios.post('/api/register', {
        name: `${firstName} ${lastName}`,
        email,
        password,
        role,
      });

      if (response.status === 201) {
        toast.success('Registred successfully!', { autoClose: 3000 });
        // Redirect to login page after successful registration
      }
    } catch (error) {
      setError('Failed to register. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="my-4">
      <h2>Sign up now</h2>
      {error && <p className="text-danger">{error}</p>}
      <div className="row">
        <div className="col-md-6 mb-3">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="form-control"
            placeholder="First Name"
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="form-control"
            placeholder="Last Name"
            required
          />
        </div>
      </div>
      <div className="mb-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          placeholder="Email address"
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          placeholder="Password"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="roleSelect" className="form-label">Select Role</label>
        <select
          id="roleSelect"
          className="form-select"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="customer">Customer</option>
          <option value="manager">Manager</option>
          <option value="waiter">Waiter</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Sign up</button>
    </form>
  );
};

export default RegisterForm;
