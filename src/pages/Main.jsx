import FormSignIn from '../components/formSignIn/FormSignIn';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Main() {
  const navigate = useNavigate();
  const access_token = new Cookies().get('access_token');
  const refresh_token = new Cookies().get('refresh_token');
  const nickname = sessionStorage.getItem('nickname');

  useEffect(() => {
    if(access_token && refresh_token && nickname){
      navigate('/lobby');
    }
  }, [])
  
  return (
    <>
      <FormSignIn></FormSignIn>
    </>
  );
}

export default Main; 