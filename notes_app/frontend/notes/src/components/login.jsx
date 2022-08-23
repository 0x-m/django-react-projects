import { TextField, SimpleButton, SocialLink, CenterBox, FooterBar, FullScreen } from './elements';
export default function Login(props) {
    return (
        <>
            <FullScreen>
                <CenterBox>
                    <TextField label="Username:" />
                    <TextField label="Password:" />
                    <SimpleButton >Login</SimpleButton>
                    <SimpleButton style={{ "backgroundColor": "#444", "marginTop": "-8px" }} >Signup</SimpleButton>

                </CenterBox>
            </FullScreen>
            <FooterBar />
        </>
    );
}