
import { TextField, CenterBox, SimpleButton } from './elements';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../api';
function Profile(props) {
    if (!isAuthenticated()) {
        return (<Navigate to="/login" replace={true} />);
    }
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