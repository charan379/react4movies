import styles from "./Youtube.module.css";
// font awesome library
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(fas, far, fab);
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//
import React, { Suspense, useRef } from "react";
import { useWindowSize } from "@/lib/hooks/useWindowSize";
import BarsLoadingAnimation from "../BarsLoadingAnimation";
import { useDisableBodyScrollOnModalOpen } from "@/lib/hooks/useDisableBodyScrollOnModalOpen";

const YouTube = React.lazy(() => import("react-youtube"));

const YoutubePlayer = ({ videoId, open, close }) => {
  const ytPlayerModalRef = useRef();

  const { height, width } = useWindowSize();

  const opts = {
    height:
      height < 920 && width < 540
        ? 320
        : height > 720
        ? 720
        : height - height * 0.2,
    width: width > 1080 ? 1080 : width - width * 0.2,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  // disable body scroll when modal is opened
  useDisableBodyScrollOnModalOpen(open);

  // If the `open` prop is false, don't render anything
  if (!open) return null;

  return (
    <div className="modal-container">
      <div ref={ytPlayerModalRef} className={styles.youtubePlayerModal}>
        <Suspense fallback={<BarsLoadingAnimation />}>
          {/* Close button */}
          <div onClick={close} className={styles.closeBtn} tabIndex="1">
            <FontAwesomeIcon icon={["fas", "times"]} size="lg" />
          </div>

          <YouTube
            className="youtube-player"
            id="yt-player-01"
            videoId={`${videoId}`}
            opts={opts}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default YoutubePlayer;
