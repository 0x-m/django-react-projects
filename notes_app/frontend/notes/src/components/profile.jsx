
import { TextField, CenterBox, SimpleButton } from './elements';

function Profile(props) {
    return (
        <div className='md:w-1/2 mx-auto mt-8'>
            <CenterBox>
                <TextField label="Firstname:" />
                <TextField label="Lastname:" />
                <TextField label="Email:" />
                <SimpleButton >Apply</SimpleButton>
            </CenterBox>
        </div>
    );
}

export { Profile };