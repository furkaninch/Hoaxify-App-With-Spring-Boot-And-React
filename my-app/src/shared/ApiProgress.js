import  {  useEffect, useState } from 'react';
import axios from 'axios';

export const useApiProgress = (apiMethod,apiPath,strictPath) => {
   const [pendingApiCall,setPendingApiCall] = useState(false);

   useEffect(() =>{
    let requestInterceptor , responseInterceptor;

    const updateApiCallfor = (method, url, inProgress) =>{
        if(method !== apiMethod){
            return;
        }
        if(strictPath && url === apiPath){
            setPendingApiCall(inProgress);
        }
        else if(!strictPath && url.startsWith(apiPath)){
            setPendingApiCall(inProgress);
        }
    }
    const registerInterceptors = () =>{
        requestInterceptor = axios.interceptors.request.use(
            request =>{
            const{method,url} = request;
            updateApiCallfor(method,url,true);
            return request;
        });

        responseInterceptor = axios.interceptors.response.use(
            response =>{
                const{method,url} = response.config;
                updateApiCallfor(method,url,false);
                return response;
            },
            error =>{
                const{method,url} = error.config;
                updateApiCallfor(method,url,false);
                throw error;
            }
        );
    };

    const unregisterInterceptors = () => {
        axios.interceptors.request.eject(requestInterceptor);
        axios.interceptors.response.eject(responseInterceptor);
    }

    registerInterceptors();
    
    return function unmount(){
        unregisterInterceptors();
    }
   },[apiPath,apiMethod,strictPath]);

    return pendingApiCall;
}





