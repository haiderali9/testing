import React from 'react';
import CursorZoom from 'react-cursor-zoom';

function ImageZoom({imgSrc, zoomImgDimensions, imgDimensions}) {
    return (
        <CursorZoom
            image={{
                src: imgSrc,
                width: imgDimensions.w,
                height: imgDimensions.h
            }}
            zoomImage={{
                src: imgSrc,
                width: zoomImgDimensions.w,
                height: zoomImgDimensions.h
            }}
        />
    );
}

export default ImageZoom;
