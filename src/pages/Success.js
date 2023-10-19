// WelcomePage.js
import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { AuthGit } from '../hooks/userAuthLoginGithub';
import { logout } from '../reducers/authUserGit';
import { useNavigate } from 'react-router-dom';


function Success() {
    const gitUser = AuthGit()
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    function handleLogout() {
        dispatch(logout());
        navigate("/home")
    }

    return (
        <div>
            {user ? (
                <div>
                    <h2>Benvenuto : {user.displayName}</h2>
                    
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <p>Devi effettuare l'accesso per visualizzare questa pagina.</p>
            )}
        </div>
    );

    
}

export default Success;
