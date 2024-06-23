import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'; // Import your global CSS file
import { AuthProvider, useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {



  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;