export const validator = (state , input) => {
    const {name , value} = input;
    switch(name) {
        case 'firstName': 
        case 'lastName': 
        {  
            if(/^[a-z\u05D0-\u05EA']+$/i.test(value) || value == ''){
                return ({ ...state, [name]: value });    
            } 
            break;
        }
        case 'age': {
            if(/^[0-9]{0,3}?$/.test(value)){
                return ({ ...state, [name]: value });    
            }
            break;
        }
        case 'height':
        case 'weight':
        {
            if(/^\d{0,3}(\.\d{0,2})?$/.test(value)){
                return ({ ...state, [name]: value });    
            }
            break;
        }
        case 'jobTitle':
        case 'gender':
        case 'sportsLevel':
        case 'username':
        case 'password':
        case 'email':
        {
            return ({ ...state, [name]: value });    
        }
        // case 'email':
        // {
        //     const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        //     if(regex.test(email)){
        //         return ({ ...state, [name]: value });    
        //     }
        //     break;
        // }
        default:
        {
            return state
        }       
     }

     return state
};