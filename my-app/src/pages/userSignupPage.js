import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import {useTranslation} from 'react-i18next';
import { useApiProgress} from '../shared/ApiProgress';
import {useDispatch} from 'react-redux';
import {signUpHandler} from '../redux/authActions';


const UserSignupPage = props => {

    const dispatch = useDispatch();
    const [form,setForm] = useState({
        username: null,
        displayName: null,
        password: null,
        passwordRepeat: null
    })
    const [errors,setErrors] = useState({});
    
    const onChange = event =>{
        const{name,value} = event.target;
        
        setForm((previousForm) => ({
            ...previousForm,
            [name]: value
        }));
        setErrors((previousErrors) => ({
            ...previousErrors,
            [name]: undefined
        }));
    }

   const  onClickSignup = async event => {
        event.preventDefault();
        const { push } = props.history;
        const {username,displayName,password} = form;

        const body = {
             username,
             displayName ,
             password
        };
       
        
        try{
           await dispatch(signUpHandler(body));
           push('/');
        }catch(error){
                if(error.response.data.validationErrors){
                    setErrors(error.response.data.validationErrors);
            }
        }
       
    }
    const{t} = useTranslation();
    const pendingApiCallSignup = useApiProgress('post','/api/1.0/users');
    const pendingApiCallLogin = useApiProgress('post','/api/1.0/auth');

    const pendingApiCall = pendingApiCallLogin || pendingApiCallSignup;

    const {username: usernameError,displayName: displayNameError,password:passwordError} = errors;
    
    let passwordRepeatError;

    if(form.password !== form.passwordRepeat){
        passwordRepeatError = t('password mismatch')
    }
    return(
    <div className="container">
        <form>
            <h1 className="text-center">{t('Sign Up')}</h1>

            <Input name="username" label={t('Username')} error={usernameError} onChange={onChange}/>
            
            <Input name="displayName" label={t('Display Name')} error={displayNameError} onChange={onChange}/>

            <Input name="password" label={t('Password')} error={passwordError} onChange ={onChange} type="password"/>
            
            <Input name="passwordRepeat" label={t('Password Repeat')} error={passwordRepeatError} onChange ={onChange} type="password"/>
            
            <div className="text-center">
                <Button disabled={pendingApiCall || passwordRepeatError !== undefined} onClick={onClickSignup} spinner= {pendingApiCall}  text={t('Sign Up')}/>
            </div>
            </form> 
        </div>
    );

}
export default UserSignupPage;