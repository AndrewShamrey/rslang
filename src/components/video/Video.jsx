import React from 'react';
import ReactPlayer from 'react-player';
import './Video.scss';

const Video = ({ src }) => (
  <ReactPlayer
    url={src}
    controls
    className="Video"
    width="480px"
    height="320px"
  />
);

export default Video;
