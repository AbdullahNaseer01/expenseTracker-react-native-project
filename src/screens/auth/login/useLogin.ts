import { useState } from 'react';
import auth from '@react-native-firebase/auth';

const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      const user = await auth().signInWithEmailAndPassword(email, password);
      console.log(user);
      console.log('login successful');
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { email, setEmail, password, setPassword, error, loading, handleLogin };
};

export default useLogin;