import { Link } from 'react-router-dom';
import { TextField, SimpleButton, SocialLink, CenterBox, FooterBar, FullScreen } from './elements';
export default function Login(props) {
    return (
        <>
            <FullScreen>
                <CenterBox>
                    <TextField label="Username:" />
                    <TextField label="Password:" />
                    <SimpleButton >Login</SimpleButton>
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