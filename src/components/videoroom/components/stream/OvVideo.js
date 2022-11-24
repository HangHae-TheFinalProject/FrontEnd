import { useEffect, useRef } from 'react';
import './StreamComponent.scss';
import test from '../../../../images/test.gif';
import { useSelector } from 'react-redux';

export default function OvVideoComponent(props) {
    const videoRef = useRef();
    const isCamera = useSelector(state => state.game.isCamera);

    useEffect(() => {
        if (props && props.user.streamManager && !!videoRef) {
            console.log('PROPS: ', props);
            props.user.getStreamManager().addVideoElement(videoRef.current);
        }

        if (props && props.user.streamManager.session && props.user && !!videoRef) {
            props.user.streamManager.session.on('signal:userChanged', (event) => {
                const data = JSON.parse(event.data);
                if (data.isScreenShareActive !== undefined) {
                    props.user.getStreamManager().addVideoElement(videoRef.current);
                }
            });
        }
    }, [])

    useEffect(() => {
        if (props && !!videoRef) {
            props.user.getStreamManager().addVideoElement(videoRef.current);
        }
    },)

    return (
        <div className='boxVideo'>
            <video
                autoPlay={true}
                id={'video-' + props.user.getStreamManager().stream.streamId}
                ref={videoRef}
                muted={props.mutedSound}
            />
            {!isCamera ? <div className='boxVideoProfile'>
                <img src={test} />
            </div> : ''}

        </div>

    );
}
