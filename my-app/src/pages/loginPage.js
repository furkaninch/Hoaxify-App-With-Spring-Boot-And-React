import Input from '../components/Input';
import { useTranslation } from 'react-i18next';
import Button from '../components/Button';
import { useApiProgress} from '../shared/ApiProgress';
import {useDispatch} from 'react-redux';
import { loginHandler} from '../redux/authActions';
import { useEffect, useState } from 'react';

const LoginPage = (props) => {
    const [username,setUsername] =  useState();
    const [error , setError] = useState();
    const [password,setPassword] = useState();
    const dispatch = useDispatch();
    
    useEffect(() => {
        setError(null);
    },[username,password]);
   
    const onClickLogin = async event =>{
        event.preventDefault();

        const creds = {
            username,
            password
        }

        
        const { push} = props.history;
        
        
        setError(null);
        try{
            await dispatch(loginHandler(creds));
            push('/');
        }
        catch(error){
            setError(error.response.data.message);
        }
    
    }
    
    const {t} = useTranslation();
    const pendingApiCall = useApiProgress('post','/api/1.0/auth');
    const buttonEnabled = username && password;

    return (
        <div className="container">
            <form>
                <h1 className="text-center">{t('Login')}</h1>
                <Input label={t('Username')}  onChange={(event) => {
                    setUsername(event.target.value);
                }}/>
                <Input label={t("Password")}  type="password" onChange={(event) => {
                    setPassword(event.target.value);
                }} />
                
                
                {error && <div className="alert alert-danger">
                    {error}
                </div>}
                    <div className="text-center">
                        <Button disabled={!buttonEnabled || pendingApiCall} onClick={onClickLogin} spinner= {pendingApiCall} text={t('Login')}/>
                    </div>

            </form>
        </div>
    );
    
}
export default LoginPage;