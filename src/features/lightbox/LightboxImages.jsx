import React, { useEffect, useState } from "react";
import { PhotoAlbum } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Download from "yet-another-react-lightbox/plugins/download";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Share from "yet-another-react-lightbox/plugins/share";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";

const LightboxImages = ({ imagesProp, layout }) => {
  const [index, setIndex] = React.useState(-1);

  const [images, setImages] = useState([]);

  const getImages = () => {
    // { src: "/image1x320.jpg", width: 320, height: 213 },
    const images = imagesProp?.map((image, index) => {
      return {
        src: image?.file_path,
        width: image?.width,
        height: image?.height,
        downloadUrl: image?.file_path,
        downloadFilename: "image",
        share: { url: image?.file_path, title: "Image title" },
      };
    });
    setImages(images);
  };

  useEffect(() => {
    getImages();

    return () => {};
  }, [imagesProp]);

  return (
    <>
      <PhotoAlbum
        layout={layout === "rows" || layout === "columns" ? layout : "rows"}
        photos={[...images]}
        onClick={({ index }) => setIndex(index)}
      />

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={[...images]}
        plugins={[Counter, Download, Fullscreen, Share, Thumbnails, Zoom]}
        counter={{ container: { style: { top: "unset", bottom: 0 } } }}
      />
    </>
  );
};

export { LightboxImages };
