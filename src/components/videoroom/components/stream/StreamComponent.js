import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import OvVideoComponent from './OvVideo';

import './StreamComponent.scss';

import nicknameBackground from '../../../../images/svg/nicknameBackground.svg';


export default function StreamComponent(props) {
    const [state, setState] = useState({
        nickname: props.user.getNickname(),
        mutedSound: false,
        myTurn: false
    });
    const memberSpotlight = useSelector(state => state.game.spotlightMember);

    const toggleSound = () => {
        setState({
            ...state,
            mutedSound: !state.mutedSound,
        });
    };

    useEffect(() => {
        console.log(props)
        console.log(memberSpotlight + '/' + sessionStorage.getItem('nickname'));
        if (memberSpotlight === state.nickname) {
            setState({
                ...state,
                myTurn: true
            })
        } else {
            setState({
                ...state,
                myTurn: false
            })
        }
    }, [memberSpotlight]);

    return (
        <div className={`videoBox ${state.myTurn ? 'boxSpotlight' : ''}`}>
            {props.user !== undefined &&
                props.user.getStreamManager() !== undefined ? (
                <div>
                    <OvVideoComponent user={props.user} mutedSound={state.mutedSound} myTurn={state.myTurn}/>
                    <div className="nicknameBox">
                        <img src={nicknameBackground} className="nicknameBackground" />
                        <div className="nickname boldfont">{state.nickname.replace(/#\d*/, '')}</div>
                        {/* <NickNameFrame myTurn={state.myTurn} /> */}
                    </div>
                    {/* <VideoFrame myTurn={state.myTurn} /> */}
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
