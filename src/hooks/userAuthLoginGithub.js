import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { Dispatch, useDispatch } from "react-redux";
import { logout, setUser, loginSuccess } from "../reducers/authUserGit";
import jwtDecode from 'jwt-decode';


export const AuthGit = () =>
{
    const [ token, setToken ] = useSearchParams()
    const dispatch = useDispatch()
    useEffect(() =>
    {
        const currentToken = Object.fromEntries([ ...token ])
        const valToken = Object.keys(currentToken)[ 0 ];
        localStorage.setItem("token", valToken)
        if (valToken)
        {
            // Decodifica il token
            const decodedToken = jwtDecode(valToken);
            console.log("sono qui", decodedToken)

            // Ora che hai il token decodificato, puoi ottenere i dati dell'utente
            const userData = {
                displayName: decodedToken.displayName, // Assumi che il token contenga il campo 'firstName'
                // Altri campi dell'utente
            };

            // Aggiorna lo stato Redux con i dati dell'utente
            dispatch(loginSuccess({ token: valToken }));

            
            dispatch(setUser(userData));
        }
    }, [ token, dispatch ]);

    return token // Questo componente non restituisce nulla
}
