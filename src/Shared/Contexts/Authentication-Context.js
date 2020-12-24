import {createContext} from 'react';

export const AuthContext = createContext(
    {
        loggedIn : false , 
        userId   : null,
        userRole : null,
        userImage : 'SCCMS',
        userToken : null,
        login    : () => {},
        logout   : () => {},

    }
)