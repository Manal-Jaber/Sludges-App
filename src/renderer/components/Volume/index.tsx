import React from 'react';
import './index.scss';

interface Volume {}

const Volume: React.FC<Volume> = () => {
  return <div className="volume">Volume</div>;
};

export default Volume;
