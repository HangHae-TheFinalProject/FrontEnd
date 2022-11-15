import React, { Component } from 'react';
import './StreamComponent.css';
import OvVideoComponent from './OvVideo';

import MicOff from '@material-ui/icons/MicOff';
import VideocamOff from '@material-ui/icons/VideocamOff';
import VolumeUp from '@material-ui/icons/VolumeUp';
import VolumeOff from '@material-ui/icons/VolumeOff';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import HighlightOff from '@material-ui/icons/HighlightOff';
import FormHelperText from '@material-ui/core/FormHelperText';

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
        <div className="OT_widget-container">
            <div className="pointer nickname">
                {state.showForm ? (
                    <FormControl id="nicknameForm">
                        <IconButton color="inherit" id="closeButton" onClick={toggleNicknameForm}>
                            <HighlightOff />
                        </IconButton>
                        <InputLabel htmlFor="name-simple" id="label">
                            Nickname
                        </InputLabel>
                        <Input
                            color="inherit"
                            id="input"
                            value={state.nickname}
                            onChange={handleChange}
                            onKeyPress={handlePressKey}
                            required
                        />
                        {!state.isFormValid && state.nickname.length <= 3 && (
                            <FormHelperText id="name-error-text">Nickname is too short!</FormHelperText>
                        )}
                        {!state.isFormValid && state.nickname.length >= 20 && (
                            <FormHelperText id="name-error-text">Nickname is too long!</FormHelperText>
                        )}
                    </FormControl>
                ) : (
                    <div onClick={toggleNicknameForm}>
                        <span id="nickname">{props.user.getNickname()}</span>
                        {props.user.isLocal() && <span id=""> (edit)</span>}
                    </div>
                )}
            </div>

            {props.user !== undefined && props.user.getStreamManager() !== undefined ? (
                <div className="streamComponent">
                    <OvVideoComponent user={props.user} mutedSound={state.mutedSound} />
                    <div id="statusIcons">
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
                    </div>
                    <div>
                        {!props.user.isLocal() && (
                            <IconButton id="volumeButton" onClick={toggleSound}>
                                {state.mutedSound ? <VolumeOff color="secondary" /> : <VolumeUp />}
                            </IconButton>
                        )}
                    </div>
                </div>
            ) : null}
        </div>
    );
}
