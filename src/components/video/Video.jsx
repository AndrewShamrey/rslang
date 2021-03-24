import React from 'react';
import ReactPlayer from 'react-player';
import './Video.scss';

const Video = ({ src = 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4' }) => (
  <ReactPlayer
    url={src}
    controls
    className="Video"
    width="500px"
    height="320px"
  />
);

export default Video;
