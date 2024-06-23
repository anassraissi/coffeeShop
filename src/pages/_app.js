import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'; // Import your global CSS file
import { AuthProvider, useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {



  return (
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer />
    </AuthProvider>
  );
}

export default MyApp;