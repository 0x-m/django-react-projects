import { TextField, SimpleButton, SocialLink, CenterBox, FooterBar, FullScreen } from './elements';
import { isAuthenticated } from '../api';
import { Navigate, useNavigate } from 'react-router-dom';


export default function Signup(props) {
    const navigate = useNavigate();
    if (isAuthenticated()) {
        return <Navigate to="/signup" replace={true} />
    }
    const signup = async (e) => {
        e.preventDefault();
        const data_json = JSON.stringify(
            Object.fromEntries((
                new FormData(e.target)).entries()));
        console.log(data_json)
        const result = await fetch('http://localhost:8000/api/v1/users/registration/', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: data_json
        }).then(response => {

            navigate("/login");
            return response.status === 201;
        })
        console.log(result);
    }

    return (
        <>
            <FullScreen>
                <CenterBox>
                    <form onSubmit={signup} className='flex flex-col gap-2 w-full'>
                        <TextField name="username" label="Username:" />
                        <TextField type="password" name="password1" label="Password:" />
                        <TextField type="password" name="password2" label="Confirm:" />
                        <TextField type="email" name="email" label="Email:" />
                        <SimpleButton>Signup</SimpleButton>
                    </form>
                    <div className="flex gap-2 justify-center items-center text-gray-400">
                        <SocialLink icon="bi-facebook" />
                        <SocialLink icon="bi-twitter" />
                        <SocialLink icon="bi-google" />
                    </div>
                </CenterBox>
            </FullScreen>
            <FooterBar />
        </>
    );
}