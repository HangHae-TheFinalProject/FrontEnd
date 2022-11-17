import './StreamComponent.scss';
import OvVideoComponent from './OvVideo';
import videoFrame from '../../../../images/svg/videoFrame.svg';
import nicknameFrame from '../../../../images/svg/nicknameFrame.svg';
import nicknameBackground from '../../../../images/svg/nicknameBackground.svg';

import MicOff from '@material-ui/icons/MicOff';
import VideocamOff from '@material-ui/icons/VideocamOff';
// import VolumeUp from '@material-ui/icons/VolumeUp';
// import VolumeOff from '@material-ui/icons/VolumeOff';
// import FormControl from '@material-ui/core/FormControl';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import IconButton from '@material-ui/core/IconButton';
// import HighlightOff from '@material-ui/icons/HighlightOff';
// import FormHelperText from '@material-ui/core/FormHelperText';

import { useState } from 'react';

export default function StreamComponent(props) {
    const [state, setState] = useState({
        nickname: props.user.getNickname(),
        showForm: false,
        mutedSound: false,
        isFormValid: true
    });

    const handleChange = (event) => {
        setState({
            ...state,
            nickname: event.target.value
        });
        event.preventDefault();
    }

    const toggleNicknameForm = () => {
        if (props.user.isLocal()) {
            setState({
                ...state,
                showForm: !state.showForm
            });
        }
    }

    const toggleSound = () => {
        setState({
            ...state,
            mutedSound: !state.mutedSound
        });
    }

    const handlePressKey = (event) => {
        if (event.key === 'Enter') {
            console.log(state.nickname);
            if (state.nickname.length >= 3 && state.nickname.length <= 20) {
                props.handleNickname(state.nickname);
                toggleNicknameForm();
                setState({
                    ...state,
                    isFormValid: true
                });
            } else {
                setState({
                    ...state,
                    isFormValid: false
                });
            }
        }
    }

    return (
        <div >
            {props.user !== undefined && props.user.getStreamManager() !== undefined ? (
                <div className='videoBox'>
                    <OvVideoComponent user={props.user} mutedSound={state.mutedSound} />
                    <img src={videoFrame} />
                    <div className='nicknameBox'>
                        <img src={nicknameBackground} className='nicknameBackground'/>
                        <div className="nickname boldfont">Hello</div>
                        <img src={nicknameFrame} />
                    </div>
                    {/* <div id="statusIcons">
                        {!props.user.isVideoActive() ? (
                            <div id="camIcon">
                                <VideocamOff id="statusCam" />
                            </div>
                        ) : null}
                        {!props.user.isAudioActive() ? (
                            <div id="micIcon">
                                <MicOff id="statusMic" />
                            </div>
                        ) : null}
                    </div> */}
                </div>
            ) : null}
        </div>
    );
}
