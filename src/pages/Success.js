
import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { AuthGit } from '../hooks/userAuthLoginGithub';
import "./success.css"


function Success() {
    const gitUser = AuthGit()
  
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    function handleLogout() {
        window.location.href = "http://localhost:3000/home"
    }

    return (
        <div className='success-back'>
            <div className='success-main'>
            {user ? (
                <div className='d-flex flex-column bg-primary-subtle p-4 rounded-2 '>
                    <h2 className='text-black'>Benvenuto : {user.displayName}</h2>
                    
                    <button className='my-3 btn btn-primary' onClick={handleLogout}>Clicca qui per entrare nel sito </button>
                </div>
            ) : (
                <p>Devi effettuare l'accesso per visualizzare questa pagina.</p>
            )}
            </div>
            
        </div>
    );

    
}

export default Success;
