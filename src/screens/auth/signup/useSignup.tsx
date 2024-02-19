import {useState} from 'react';
import auth from '@react-native-firebase/auth';

const useSignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    try {
      setLoading(true); // Set loading state to true during signup process
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      console.log(userCredential.user);
      console.log('User created successfully');
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    handleSignup,
  };
};

export default useSignup;
