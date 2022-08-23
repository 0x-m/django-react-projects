import { TextField, SimpleButton, SocialLink, CenterBox, FooterBar, FullScreen } from './elements';
export default function Signup(props) {
    return (
        <>
            <FullScreen>
                <CenterBox>
                    <TextField label="Username:" />
                    <TextField label="Password:" />
                    <TextField label="Confirm:" />
                    <TextField label="Email:" />
                    <SimpleButton >Signup</SimpleButton>
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