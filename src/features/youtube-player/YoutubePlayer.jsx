import './youtube-player.style.css';
import { useEscapeKey, useOnOutSideClick, useWindowSize } from 'hooks';
import React, { useCallback, useRef } from 'react'
import Youtube from 'react-youtube';

const YoutubePlayer = ({ videoId, open, close }) => {

    const ytPlayerModalRef = useRef();

    const { height, width } = useWindowSize();

    const opts = {
        height: (height < 920 && width < 540) ? 320 : (height > 720) ? 720 : height - (height * 0.30),
        width: width > 1080 ? 1080 : width - (width * 0.20),
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    // Register a callback to close the modal when the user clicks outside it
    useOnOutSideClick(ytPlayerModalRef, useCallback(close, [close]));

    // Register a callback to close the modal when the user presses the Escape key
    useEscapeKey(close);

    // If the `open` prop is false, don't render anything
    if (!open) return null;

    return (
        <div className='modal-container'>
            <div ref={ytPlayerModalRef} className='youtube-player-modal'>
                {/* Close button */}
                <div onClick={close} className="close-btn" tabIndex="1">
                    <i className="fas fa-times fa-lg"></i>
                </div>

                <Youtube
                    className='youtube-player'
                    id='yt-player-01'
                    videoId={`${videoId}`}
                    opts={opts}
                />
            </div>
        </div>
    )
}

export { YoutubePlayer }