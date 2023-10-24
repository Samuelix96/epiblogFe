import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { Dispatch, useDispatch } from "react-redux";
import { logout, setUser, loginSuccess } from "../reducers/authUserGit";
import jwtDecode from 'jwt-decode';
import { getBlogPostsFromApi } from "../reducers/blogsReducer";
import axios from "axios";

export const AuthGit = () =>
{
    const dispatch = useDispatch();

    const isAuthor = () => {
        const validateToken = async() => {
            try {
                const response = axios.post(`${process.env.REACT_APP_BASE_SERVER_URL}/verifyToken`, {
                    sessionToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJNYXJ0YSIsImxhc3ROYW1lIjoiVmVyZGkiLCJlbWFpbCI6Im1hcnRhcm9zc2lAZ21haWwuY29tIiwiYmlydGgiOiI0IHNldHRlbWJyZSIsImlhdCI6MTY5NzU4MjMwMSwiZXhwIjoxNjk3NjY4NzAxfQ.GGj1am8TgckwWhZQOV93ZGRCQHOrRn4o2iT3QnvIk_Y"
                    
                }, {
                    headers: {
                        "Content-Type" : "application/json"
                    } 
                })
            } catch (error) {
                console.log("errore nel verify token", error)
            }
          
        }
    }
    const [ token, setToken ] = useSearchParams()
    
    useEffect(() =>
    {
        const currentToken = Object.fromEntries([ ...token ])
        const valToken = Object.keys(currentToken)[ 0 ];
        localStorage.setItem("token", JSON.stringify(valToken) )
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

    return null // Questo componente non restituisce nulla
}
