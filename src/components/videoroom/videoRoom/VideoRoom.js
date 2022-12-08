import React, { Component } from 'react';
import axios from 'axios';
import './style.scss';
import { OpenVidu } from 'openvidu-browser';
import Video from '../video/Video';
// import DialogExtensionComponent from './dialog-extension/DialogExtension';
// import ChatComponent from './chat/ChatComponent';

import UserModel from './userModel';
// import ToolbarComponent from './toolbar/ToolbarComponent';

const localUser = new UserModel();

class VideoRoom extends Component {
    constructor(props) {
        super(props);
        this.OPENVIDU_SERVER_URL = process.env.REACT_APP_OPENVIDU_URL;
        this.OPENVIDU_SERVER_SECRET = this.props.openviduSecret ? this.props.openviduSecret : 'MY_SECRET';
        this.hasBeenUpdated = false;
        let sessionName = this.props.sessionName ? this.props.sessionName : 'SessionA';
        let userName = sessionStorage.getItem('nickname') || 'User' + Math.floor(Math.random() * 100);
        this.remotes = [];
        this.localUserAccessAllowed = false;
        this.state = {
            mySessionId: sessionName,
            myUserName: userName,
            session: undefined,
            localUser: undefined,
            subscribers: [],
            currentVideoDevice: undefined,
            isMute: this.props.isMute,
            micActive: this.props.micActive,
            videoActive: this.props.videoActive
        }

        this.joinSession = this.joinSession.bind(this);
        this.leaveSession = this.leaveSession.bind(this);
        this.onbeforeunload = this.onbeforeunload.bind(this)
        this.camStatusChanged = this.camStatusChanged.bind(this);
        this.micStatusChanged = this.micStatusChanged.bind(this);
        this.micToggleMuted = this.micToggleMuted.bind(this);
        this.nicknameChanged = this.nicknameChanged.bind(this);
        this.switchCamera = this.switchCamera.bind(this);
        this.checkNotification = this.checkNotification.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.isMute !== prevProps.isMute) {
            this.setState({ isMute: this.props.isMute })
            this.micToggleMuted();
            // this.micStatusChanged();
        }

        if (this.props.micActive !== prevProps.micActive) {
            this.setState({ micActive: this.props.micActive })
            this.micStatusChanged();
        }

        if (this.props.videoActive !== prevProps.videoActive) {
            this.setState({ videoActive: this.props.videoActive })
            this.camStatusChanged();
        }
    }

    componentDidMount() {

        const openViduLayoutOptions = {
            maxRatio: 3 / 2, // The narrowest ratio that will be used (default 2x3)
            minRatio: 9 / 16, // The widest ratio that will be used (default 16x9)
            fixedRatio: false, // If this is true then the aspect ratio of the video is maintained and minRatio and maxRatio are ignored (default false)
            bigClass: 'OV_big', // The class to add to elements that should be sized bigger
            bigPercentage: 0.8, // The maximum percentage of space the big ones should take up
            bigFixedRatio: false, // fixedRatio for the big ones
            bigMaxRatio: 3 / 2, // The narrowest ratio to use for the big elements (default 2x3)
            bigMinRatio: 9 / 16, // The widest ratio to use for the big elements (default 16x9)
            bigFirst: true, // Whether to place the big one in the top left (true) or bottom right
            animate: true, // Whether you want to animate the transitions
        };

        window.addEventListener('beforeunload', this.onbeforeunload);
        this.joinSession();
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.onbeforeunload);
        this.leaveSession();
    }

    onbeforeunload(event) {
        this.leaveSession();
    }

    joinSession() {
        this.OV = new OpenVidu();

        this.setState(
            {
                session: this.OV.initSession(),
            },
            () => {
                this.subscribeToStreamCreated();
                this.connectToSession();
            },
        );
    }

    connectToSession() {
        if (this.props.token !== undefined) {
            this.connect(this.props.token);
        } else {
            this.getToken().then((token) => {
                this.connect(token);
            }).catch((error) => {
                if (this.props.error) {
                    this.props.error({ error: error.error, messgae: error.message, code: error.code, status: error.status });
                }
                alert('There was an error getting the token:', error.message);
            });
        }
    }

    connect(token) {
        this.state.session
            .connect(
                token,
                { clientData: this.state.myUserName },
            )
            .then(() => {
                this.connectWebCam();
            })
            .catch((error) => {
                if (this.props.error) {
                    this.props.error({ error: error.error, messgae: error.message, code: error.code, status: error.status });
                }
                alert('There was an error connecting to the session:', error.message);
            });
    }

    async connectWebCam() {
        const devices = await this.OV.getDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');

        let publisher = this.OV.initPublisher(undefined, {
            audioSource: undefined,
            videoSource: videoDevices[0].deviceId,
            publishAudio: localUser.isAudioActive(),
            publishVideo: localUser.isVideoActive(),
            resolution: '640x480',
            frameRate: 30,
            insertMode: 'APPEND',
        });

        if (this.state.session.capabilities.publish) {
            publisher.on('accessAllowed', () => {
                this.state.session.publish(publisher).then(() => {
                    this.updateSubscribers();
                    this.localUserAccessAllowed = true;
                    if (this.props.joinSession) {
                        this.props.joinSession();
                    }
                });
            });

        }
        localUser.setNickname(this.state.myUserName);
        localUser.setConnectionId(this.state.session.connection.connectionId);
        localUser.setStreamManager(publisher);
        this.subscribeToUserChanged();
        this.subscribeToStreamDestroyed();

        this.setState({ currentVideoDevice: videoDevices[0], localUser: localUser }, () => {
            this.state.localUser.getStreamManager().on('streamPlaying', (e) => {
                publisher.videos[0].video.parentElement.classList.remove('custom-class');

            });
        }
        )
    }

    updateSubscribers() {
        const subscribers = this.remotes;
        this.setState(
            {
                subscribers: subscribers,
            },
            () => {
                if (this.state.localUser) {
                    this.sendSignalUserChanged({
                        isAudioActive: this.state.localUser.isAudioActive(),
                        isVideoActive: this.state.localUser.isVideoActive(),
                        nickname: this.state.localUser.getNickname(),
                    });
                }
            }
        );
    }

    leaveSession() {
        const mySession = this.state.session;

        if (mySession) {
            mySession.disconnect();
        }

        // Empty all properties...
        this.OV = null;
        this.setState({
            session: undefined,
            subscribers: [],
            mySessionId: 'SessionA',
            myUserName: 'OpenVidu_User' + Math.floor(Math.random() * 100),
            localUser: undefined,
        });
        if (this.props.leaveSession) {
            this.props.leaveSession();
        }
    }

    camStatusChanged() {
        localUser.setVideoActive(!localUser.isVideoActive());
        localUser.getStreamManager().publishVideo(localUser.isVideoActive());
        this.sendSignalUserChanged({ isVideoActive: localUser.isVideoActive() });
        this.setState({ localUser: localUser });
    }

    micStatusChanged() {
        if (this.isMute) return;
        localUser.setAudioActive(!localUser.isAudioActive());
        localUser.getStreamManager().publishAudio(localUser.isAudioActive());
        this.sendSignalUserChanged({ isAudioActive: localUser.isAudioActive() });
        this.setState({ localUser: localUser });
    }

    // Custom
    micToggleMuted() {
        this.isMute = !this.isMute;
        localUser.setAudioActive(!this.isMute);
        localUser.getStreamManager().publishAudio(!this.isMute);
        this.sendSignalUserChanged({ isAudioActive: !this.isMute });
        this.setState({ localUser: localUser });
    }

    nicknameChanged(nickname) {
        let localUser = this.state.localUser;
        localUser.setNickname(nickname);
        this.setState({ localUser: localUser });
        this.sendSignalUserChanged({ nickname: this.state.localUser.getNickname(), });
    }

    deleteSubscriber(stream) {
        const remoteUsers = this.state.subscribers;
        const userStream = remoteUsers.filter(
            (user) => user.getStreamManager().stream === stream
        )[0];
        let index = remoteUsers.indexOf(userStream, 0);
        if (index > -1) {
            remoteUsers.splice(index, 1);
            this.setState({
                subscribers: remoteUsers,
            });
        }
    }

    subscribeToStreamCreated() {
        this.state.session.on('streamCreated', (event) => {
            const subscriber = this.state.session.subscribe(event.stream, undefined);
            subscriber.on('streamPlaying', (e) => {
                subscriber.videos[0].video.parentElement.classList.remove(
                    'custom-class'
                );
            });
            const newUser = new UserModel();
            newUser.setStreamManager(subscriber);
            newUser.setConnectionId(event.stream.connection.connectionId);
            newUser.setType('remote');
            const nickname = event.stream.connection.data.split('%')[0];
            newUser.setNickname(JSON.parse(nickname).clientData);
            this.remotes.push(newUser);
            if (this.localUserAccessAllowed) {
                this.updateSubscribers();
            }
        });
    }

    subscribeToStreamDestroyed() {
        // On every Stream destroyed...
        this.state.session.on('streamDestroyed', (event) => {
            // Remove the stream from 'subscribers' array
            this.deleteSubscriber(event.stream);
            event.preventDefault();
        });
    }

    subscribeToUserChanged() {
        this.state.session.on('signal:userChanged', (event) => {
            let remoteUsers = this.state.subscribers;
            remoteUsers.forEach((user) => {
                if (user.getConnectionId() === event.from.connectionId) {
                    const data = JSON.parse(event.data);
                    if (data.isAudioActive !== undefined) {
                        user.setAudioActive(data.isAudioActive);
                    }
                    if (data.isVideoActive !== undefined) {
                        user.setVideoActive(data.isVideoActive);
                    }
                    if (data.nickname !== undefined) {
                        user.setNickname(data.nickname);
                    }
                }
            });
            this.setState(
                {
                    subscribers: remoteUsers,
                }
            );
        });
    }

    sendSignalUserChanged(data) {
        const signalOptions = {
            data: JSON.stringify(data),
            type: 'userChanged',
        };
        this.state.session.signal(signalOptions);
    }

    async switchCamera() {
        try {
            const devices = await this.OV.getDevices();
            const videoDevices = devices.filter(
                (device) => device.kind === 'videoinput'
            );

            if (videoDevices && videoDevices.length > 1) {
                var newVideoDevice = videoDevices.filter(
                    (device) => device.deviceId !== this.state.currentVideoDevice.deviceId
                );

                if (newVideoDevice.length > 0) {
                    // Creating a new publisher with specific videoSource
                    // In mobile devices the default and first camera is the front one
                    const newPublisher = this.OV.initPublisher(undefined, {
                        audioSource: undefined,
                        videoSource: newVideoDevice[0].deviceId,
                        publishAudio: localUser.isAudioActive(),
                        publishVideo: localUser.isVideoActive(),
                        mirror: true,
                    });

                    //newPublisher.once("accessAllowed", () => {
                    await this.state.session.unpublish(
                        this.state.localUser.getStreamManager()
                    );
                    await this.state.session.publish(newPublisher);
                    this.state.localUser.setStreamManager(newPublisher);
                    this.setState({
                        currentVideoDevice: newVideoDevice,
                        localUser: localUser,
                    });
                }
            }
        } catch (e) {

        }
    }

    checkNotification(event) {
        this.setState({
            messageReceived: this.state.chatDisplay === 'none',
        });
    }

    render() {
        const localUser = this.state.localUser;

        return (
            <div className="videoContainer">
                {localUser !== undefined && localUser.getStreamManager() !== undefined && (
                    <div className="videoBox" id="localUser">
                        <Video
                            user={localUser}
                            handleNickname={this.nicknameChanged}
                        />
                    </div>
                )}
                {this.state.subscribers.map((sub, i) => (
                    <div className="videoBox" key={i} id="remoteUsers">
                        <Video
                            user={sub}
                            streamId={sub.streamManager.stream.streamId}
                        />
                    </div>
                ))}
            </div>
        );
    }

    getToken() {
        return this.createSession(this.state.mySessionId).then((sessionId) =>
            this.createToken(sessionId)
        );
    }

    createSession(sessionId) {
        return new Promise((resolve, reject) => {
            const data = JSON.stringify({ customSessionId: sessionId });
            axios
                .post(this.OPENVIDU_SERVER_URL + '/openvidu/api/sessions', data, {
                    headers: {
                        Authorization:
                            'Basic ' + btoa('OPENVIDUAPP:' + this.OPENVIDU_SERVER_SECRET),
                        'Content-Type': 'application/json',
                    },
                })
                .then((response) => {
                    resolve(response.data.id);
                })
                .catch((response) => {
                    const error = Object.assign({}, response);
                    if (error.response && error.response.status === 409) {
                        resolve(sessionId);
                    } else {
                        console.warn(
                            'No connection to OpenVidu Server. This may be a certificate error at ' +
                            this.OPENVIDU_SERVER_URL
                        );
                        if (
                            window.confirm(
                                'No connection to OpenVidu Server. This may be a certificate error at "' +
                                this.OPENVIDU_SERVER_URL +
                                '"\n\nClick OK to navigate and accept it. ' +
                                'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                                this.OPENVIDU_SERVER_URL +
                                '"'
                            )
                        ) {
                            window.location.assign(
                                this.OPENVIDU_SERVER_URL + '/accept-certificate'
                            );
                        }
                    }
                });
        });
    }

    createToken(sessionId) {
        return new Promise((resolve, reject) => {
            const data = JSON.stringify({});
            axios
                .post(
                    this.OPENVIDU_SERVER_URL +
                    '/openvidu/api/sessions/' +
                    sessionId +
                    '/connection',
                    data,
                    {
                        headers: {
                            Authorization:
                                'Basic ' + btoa('OPENVIDUAPP:' + this.OPENVIDU_SERVER_SECRET),
                            'Content-Type': 'application/json',
                        },
                    }
                )
                .then((response) => {
                    resolve(response.data.token);
                })
                .catch((error) => reject(error));
        });
    }
}
export default VideoRoom;
