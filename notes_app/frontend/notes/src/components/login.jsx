import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { TextField, SimpleButton, SocialLink, CenterBox, FooterBar, FullScreen } from './elements';
import { isAuthenticated, login, setTokens, } from '../api';
import { useEffect } from 'react';


export default function Login(props) {
    const [username, setUesrname] = useState('');
    const [password, setPassword] = useState('');
    const [authenticated, setAuthenticated] = useState(false);

    // useEffect(() => {
    //     async function checkAuth() {
    //         const res = await isAuthenticated();
    //         setAuthenticated(res);
    //     }

    //     checkAuth();
    // }, [authenticated])

    // const handleLogin = (e) => {
    //     async function login() {
    //         const resp = await fetch('http://localhost:8000/api/v1/token/', {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify({
    //                 "username": username,
    //                 "password": password
    //             })
    //         }).then(resp => {
    //             if (resp.ok) {
    //                 resp.json().then(data => {
    //                     localStorage.setItem('access-token', data['access']);
    //                     localStorage.setItem('refresh-token', data['refresh']);
    //                     console.log('access token received...');
    //                 });
    //             }
    //         });
    //     }
    // }

    const handleLogin = () => {
        fetch('http://localhost:8000/api/v1/token/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        }).then(resp => {
            if (resp.ok) {
                resp.json().then(data => {
                    setTokens(data['access'], data['refresh']);
                    setAuthenticated(true);
                });
            }
        })
    }


    if (!authenticated) {
        return (
            <>
                <FullScreen>
                    <CenterBox>
                        <TextField label="Username:" value={username} onChange={(e) => setUesrname(e.target.value)} />
                        <TextField type="password" label="Password:" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <SimpleButton onClick={handleLogin} >Login</SimpleButton>
                        <Link className='w-full' to="/signup">
                            <SimpleButton style={{ "backgroundColor": "#444", "marginTop": "-8px", "width": "100%" }} >Signup</SimpleButton>
                        </Link>
                        <Link className='text-center text-sky-400' to="/dashboard">Goto Dashboard</Link>

                    </CenterBox>
                </FullScreen>
                <FooterBar />
            </>
        );
    }
    else {
        return <Navigate to="/dashboard" replace={true} />
    }



}