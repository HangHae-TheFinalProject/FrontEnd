import './StreamComponent.scss';
import OvVideoComponent from './OvVideo';
import videoFrame from '../../../../images/svg/videoFrame.svg';
import nicknameFrame from '../../../../images/svg/nicknameFrame.svg';
import nicknameBackground from '../../../../images/svg/nicknameBackground.svg';

import { useSelector } from 'react-redux';

// import MicOff from '@material-ui/icons/MicOff';
// import VideocamOff from '@material-ui/icons/VideocamOff';
// import VolumeUp from '@material-ui/icons/VolumeUp';
// import VolumeOff from '@material-ui/icons/VolumeOff';
// import FormControl from '@material-ui/core/FormControl';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import IconButton from '@material-ui/core/IconButton';
// import HighlightOff from '@material-ui/icons/HighlightOff';
// import FormHelperText from '@material-ui/core/FormHelperText';

import { useEffect, useState } from 'react';
import { setSpotlightMember } from '../../../../redux/modules/gameSlice';

export default function StreamComponent(props) {
    const [state, setState] = useState({
        nickname: props.user.getNickname(),
        mutedSound: false,
        myTurn: false
    });

    const memberSpotlight = useSelector(state => state.game.spotlightMember);
    // const [myTurn] = memberSpotlight === sessionStorage.getItem('nickname');

    const toggleSound = () => {
        setState({
            ...state,
            mutedSound: !state.mutedSound,
        });
    };

    useEffect(() => {
        console.log(memberSpotlight + '/' + sessionStorage.getItem('nickname'))
        if(memberSpotlight === sessionStorage.getItem('nickname')) {
            setState({
                ...state,
                myTurn: true
            })
        } else{
            setState({
                ...state,
                myTurn: false
            })
        }
    }, [memberSpotlight])

    return (
        <div className={`videoBox ${state.myTurn ? 'boxSpotlight' : ''}`}>
            {props.user !== undefined &&
                props.user.getStreamManager() !== undefined ? (
                <div>
                    <OvVideoComponent user={props.user} mutedSound={state.mutedSound} />
                    <VideoFrame myTurn={state.myTurn} />
                    <div className="nicknameBox">
                        <img src={nicknameBackground} className="nicknameBackground" />
                        <div className="nickname boldfont">Hello</div>
                        <NickNameFrame myTurn={state.myTurn} />
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

const VideoFrame = ({ myTurn }) => {

    return <svg width="214" height="170" viewBox="0 0 214 170" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M191 94L193 93.9875C193.063 99.0251 192.767 106.712 192.457 113.719C192.383 115.394 192.309 117.029 192.238 118.581C192.011 123.548 191.823 127.657 191.823 129.483C191.823 129.671 191.876 129.761 191.993 129.853C192.157 129.982 192.485 130.127 193.064 130.215C194.219 130.39 195.947 130.279 198.09 129.94C202.345 129.267 207.831 127.765 212.731 126.397L213.327 128.305C201.479 132.402 192.844 136.363 187.946 141.083C185.522 143.419 184.053 145.905 183.536 148.656C183.018 151.413 183.434 154.546 184.978 158.21L184.994 158.248L185.007 158.288C185.547 159.942 185.466 161.456 184.948 162.79C184.436 164.104 183.523 165.183 182.486 166.041C180.429 167.741 177.716 168.713 175.941 168.988L175.25 167.157C178.417 165.139 178.967 161.984 177.841 159.717C176.732 157.484 173.806 155.787 169.296 157.186L168.883 157.314L168.507 157.101L157.507 150.87L155.049 149.478L157.836 149.014C168.131 147.298 176.356 142.937 182.043 134.417C187.761 125.852 191 112.956 191 94Z" className={myTurn ? 'frameSpotlight' : 'frameNormal'} stroke="#808080" strokeWidth="2" />
        <path d="M201.925 40.6232C197.268 36.3276 191.007 30.5525 182.423 29.0379C189.58 37.9141 192.341 44.3064 193.223 53.0129C193.691 57.6221 193.631 62.8658 193.459 69.4281C193.428 70.608 193.393 71.8316 193.357 73.1033C193.193 78.9206 193 85.7447 193 94H192H191C191 83.0643 190.932 73.1599 189.889 64.402C188.846 55.6481 186.837 48.12 183.008 41.9156C175.405 29.5975 160.374 22.1263 130.089 21.2608C127.828 21.2904 125.751 21.2553 123.956 21.1753L124 19.1763C126.098 19.1763 128.132 19.2044 130.104 19.2604C136.881 19.1691 145.331 18.4859 152.758 16.6592C156.475 15.7451 159.904 14.5523 162.728 13.0246C165.558 11.4946 167.722 9.66077 168.998 7.49287L170.853 8.11482C170.671 9.68967 170.083 11.9874 169.174 14.1137C168.657 15.3237 168.003 16.5587 167.207 17.5795C178.068 18.3052 192.805 23.9649 204.811 40.5843L203.328 41.9108C202.877 41.502 202.41 41.0706 201.925 40.6232Z" className={myTurn ? 'frameSpotlight' : 'frameNormal'} stroke="#808080" strokeWidth="2" />
        <path d="M132.722 0.807082L134.661 0.712309C135.106 2.19611 135.637 4.6012 135.792 7.04805C135.896 8.69149 135.841 10.4706 135.399 12.017C136.562 11.709 137.915 11.2409 139.226 10.5867C141.338 9.53202 143.202 8.06249 144.092 6.13636L145.998 6.61581C145.802 9.88599 143.43 14.2841 137.439 17.5217C131.45 20.7583 121.821 22.8617 106.919 21.656L106.877 19.6668C107.442 19.5967 108.035 19.53 108.65 19.4608C112.509 19.0267 117.245 18.4937 121.588 16.4105C126.528 14.0402 130.986 9.63483 132.722 0.807082Z" className={myTurn ? 'frameSpotlight' : 'frameNormal'} stroke="#808080" strokeWidth="2" />
        <path d="M23 94L21.0001 93.9875C20.937 99.0251 21.2329 106.712 21.5426 113.719C21.6167 115.394 21.6914 117.029 21.7624 118.581C21.9895 123.548 22.1773 127.657 22.1773 129.483C22.1773 129.671 22.1239 129.761 22.0073 129.853C21.843 129.982 21.5154 130.127 20.9365 130.215C19.7815 130.39 18.0534 130.279 15.9098 129.94C11.655 129.267 6.16891 127.765 1.269 126.397L0.673194 128.305C12.5206 132.402 21.1562 136.363 26.0543 141.083C28.4782 143.419 29.9469 145.905 30.464 148.656C30.9822 151.413 30.5655 154.546 29.0217 158.21L29.0055 158.248L28.9926 158.288C28.453 159.942 28.5337 161.456 29.0524 162.79C29.5639 164.104 30.4769 165.183 31.5144 166.041C33.5708 167.741 36.2839 168.713 38.0594 168.988L38.75 167.157C35.5831 165.139 35.0326 161.984 36.1588 159.717C37.2684 157.484 40.1945 155.787 44.7036 157.186L45.1166 157.314L45.4929 157.101L56.4929 150.87L58.9506 149.478L56.1644 149.014C45.8694 147.298 37.6441 142.937 31.9567 134.417C26.2389 125.852 23 112.956 23 94Z" className={myTurn ? 'frameSpotlight' : 'frameNormal'} stroke="#808080" strokeWidth="2" />
        <path d="M12.0753 40.6232C16.7321 36.3276 22.9928 30.5525 31.5772 29.0379C24.4203 37.9141 21.6588 44.3064 20.7765 53.0129C20.3094 57.6221 20.3693 62.8658 20.5412 69.4281C20.5721 70.608 20.6067 71.8316 20.6427 73.1033C20.8071 78.9206 21 85.7447 21 94H22H23C23 83.0643 23.0684 73.1599 24.1115 64.402C25.1541 55.6481 27.1629 48.12 30.9922 41.9156C38.5947 29.5975 53.6257 22.1263 83.9109 21.2608C86.1725 21.2904 88.2494 21.2553 90.0445 21.1753L90 19.1763C87.9023 19.1763 85.8682 19.2044 83.8957 19.2604C77.1186 19.1691 68.6693 18.4859 61.2419 16.6592C57.5248 15.7451 54.0963 14.5523 51.2715 13.0246C48.4422 11.4946 46.2777 9.66077 45.0021 7.49287L43.1468 8.11482C43.3289 9.68967 43.9171 11.9874 44.8258 14.1137C45.3428 15.3237 45.9971 16.5587 46.793 17.5795C35.9319 18.3052 21.1947 23.9649 9.18938 40.5843L10.6716 41.9108C11.1226 41.502 11.5903 41.0706 12.0753 40.6232Z" className={myTurn ? 'frameSpotlight' : 'frameNormal'} stroke="#808080" strokeWidth="2" />
        <path d="M81.2784 0.807082L79.3394 0.712309C78.8937 2.19611 78.3634 4.6012 78.208 7.04805C78.1035 8.69149 78.1593 10.4706 78.6011 12.017C77.4376 11.709 76.0846 11.2409 74.7744 10.5867C72.6623 9.53202 70.7979 8.06249 69.9078 6.13636L68.0018 6.61581C68.1982 9.88599 70.57 14.2841 76.5609 17.5217C82.5502 20.7583 92.1789 22.8617 107.081 21.656L107.123 19.6668C106.558 19.5967 105.965 19.53 105.35 19.4608C101.491 19.0267 96.7545 18.4937 92.4123 16.4105C87.4717 14.0402 83.014 9.63483 81.2784 0.807082Z" className={myTurn ? 'frameSpotlight' : 'frameNormal'} stroke="#808080" strokeWidth="2" />
        <path d="M107 22C111.005 22 114 18.2681 114 14C114 9.7319 111.005 6 107 6C102.995 6 100 9.7319 100 14C100 18.2681 102.995 22 107 22Z" className={myTurn ? 'frameSpotlight' : 'frameNormal'} stroke="#808080" strokeWidth="2" />
    </svg>

}

const NickNameFrame = ({ myTurn }) => {

    return <svg width="134" height="40" viewBox="0 0 134 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="path-1-outside-1_310_968" maskUnits="userSpaceOnUse" x="0" y="0" width="134" height="40" fill="black">
            <rect fill="white" width="134" height="40" />
            <path fillRule="evenodd" clipRule="evenodd" d="M119.738 2.00006H68.9698V2H14.2621C13.3188 4.49999 9.5459 9.49998 2 9.49998V11V28.9999V30.5C9.5459 30.5 13.3188 35.5 14.2621 38H65.0302V38H119.738C120.681 35.5 124.454 30.5 132 30.5V29V11.0001V9.50004C124.454 9.50004 120.681 4.50005 119.738 2.00006ZM6.5083 12.9091V11.6909C13.5308 11.6909 17.042 7.63028 17.9198 5.59998H65.1667H68.8328H116.08C116.957 7.63028 120.469 11.6909 127.491 11.6909V12.9091V27.5273V28.7455C120.469 28.7455 116.957 32.8061 116.08 34.8364H68.8328H65.1667H17.9198C17.042 32.8061 13.5308 28.7455 6.5083 28.7455V27.5273V12.9091Z" />
        </mask>
        <path fillRule="evenodd" clipRule="evenodd" d="M119.738 2.00006H68.9698V2H14.2621C13.3188 4.49999 9.5459 9.49998 2 9.49998V11V28.9999V30.5C9.5459 30.5 13.3188 35.5 14.2621 38H65.0302V38H119.738C120.681 35.5 124.454 30.5 132 30.5V29V11.0001V9.50004C124.454 9.50004 120.681 4.50005 119.738 2.00006ZM6.5083 12.9091V11.6909C13.5308 11.6909 17.042 7.63028 17.9198 5.59998H65.1667H68.8328H116.08C116.957 7.63028 120.469 11.6909 127.491 11.6909V12.9091V27.5273V28.7455C120.469 28.7455 116.957 32.8061 116.08 34.8364H68.8328H65.1667H17.9198C17.042 32.8061 13.5308 28.7455 6.5083 28.7455V27.5273V12.9091Z" className={myTurn ? 'frameSpotlight' : 'frameNormal'} />
        <path d="M68.9698 2.00006H66.9698V4.00006H68.9698V2.00006ZM119.738 2.00006L121.609 1.29405L121.121 5.91278e-05H119.738V2.00006ZM68.9698 2H70.9698V0H68.9698V2ZM14.2621 2V0H12.8791L12.3908 1.29399L14.2621 2ZM2 9.49998V7.49998H0V9.49998H2ZM2 30.5H0V32.5H2V30.5ZM14.2621 38L12.3908 38.706L12.8791 40H14.2621V38ZM65.0302 38H67.0302V36H65.0302V38ZM65.0302 38H63.0302V40H65.0302V38ZM119.738 38V40H121.121L121.609 38.706L119.738 38ZM132 30.5V32.5H134V30.5H132ZM132 9.50004H134V7.50004H132V9.50004ZM6.5083 11.6909V9.69089H4.5083V11.6909H6.5083ZM17.9198 5.59998V3.59998H16.6056L16.0841 4.80627L17.9198 5.59998ZM116.08 5.59998L117.915 4.80628L117.394 3.59998H116.08V5.59998ZM127.491 11.6909H129.491V9.69089H127.491V11.6909ZM127.491 28.7455V30.7455H129.491V28.7455H127.491ZM116.08 34.8364V36.8364H117.394L117.915 35.6301L116.08 34.8364ZM17.9198 34.8364L16.0841 35.6301L16.6056 36.8364H17.9198V34.8364ZM6.5083 28.7455H4.5083V30.7455H6.5083V28.7455ZM68.9698 4.00006H119.738V5.91278e-05H68.9698V4.00006ZM66.9698 2V2.00006H70.9698V2H66.9698ZM14.2621 4H68.9698V0H14.2621V4ZM2 11.5C10.5556 11.5 14.9644 5.80427 16.1333 2.70601L12.3908 1.29399C11.6733 3.19572 8.53619 7.49998 2 7.49998V11.5ZM4 11V9.49998H0V11H4ZM4 28.9999V11H0V28.9999H4ZM4 30.5V28.9999H0V30.5H4ZM16.1333 37.2939C14.9644 34.1957 10.5556 28.5 2 28.5V32.5C8.53619 32.5 11.6733 36.8042 12.3908 38.706L16.1333 37.2939ZM65.0302 36H14.2621V40H65.0302V36ZM67.0302 38V38H63.0302V38H67.0302ZM119.738 36H65.0302V40H119.738V36ZM132 28.5C123.444 28.5 119.036 34.1957 117.867 37.294L121.609 38.706C122.327 36.8043 125.464 32.5 132 32.5V28.5ZM130 29V30.5H134V29H130ZM130 11.0001V29H134V11.0001H130ZM130 9.50004V11.0001H134V9.50004H130ZM117.867 2.70607C119.036 5.80433 123.444 11.5 132 11.5V7.50004C125.464 7.50004 122.327 3.19578 121.609 1.29405L117.867 2.70607ZM4.5083 11.6909V12.9091H8.5083V11.6909H4.5083ZM16.0841 4.80627C15.5023 6.15179 12.6826 9.69089 6.5083 9.69089V13.6909C14.379 13.6909 18.5817 9.10877 19.7556 6.39368L16.0841 4.80627ZM65.1667 3.59998H17.9198V7.59998H65.1667V3.59998ZM68.8328 3.59998H65.1667V7.59998H68.8328V3.59998ZM116.08 3.59998H68.8328V7.59998H116.08V3.59998ZM127.491 9.69089C121.317 9.69089 118.497 6.15179 117.915 4.80628L114.244 6.39367C115.418 9.10877 119.621 13.6909 127.491 13.6909V9.69089ZM129.491 12.9091V11.6909H125.491V12.9091H129.491ZM129.491 27.5273V12.9091H125.491V27.5273H129.491ZM129.491 28.7455V27.5273H125.491V28.7455H129.491ZM117.915 35.6301C118.497 34.2846 121.317 30.7455 127.491 30.7455V26.7455C119.621 26.7455 115.418 31.3276 114.244 34.0427L117.915 35.6301ZM68.8328 36.8364H116.08V32.8364H68.8328V36.8364ZM65.1667 36.8364H68.8328V32.8364H65.1667V36.8364ZM17.9198 36.8364H65.1667V32.8364H17.9198V36.8364ZM6.5083 30.7455C12.6826 30.7455 15.5023 34.2846 16.0841 35.6301L19.7556 34.0427C18.5817 31.3276 14.379 26.7455 6.5083 26.7455V30.7455ZM4.5083 27.5273V28.7455H8.5083V27.5273H4.5083ZM4.5083 12.9091V27.5273H8.5083V12.9091H4.5083Z" fill="#808080" mask="url(#path-1-outside-1_310_968)" />
    </svg>

}
