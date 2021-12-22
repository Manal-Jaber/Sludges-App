import React from 'react';
import LeftMainSide from '../LeftMainSide';
import RightMainSide from '../RightMainSide';
import './index.scss';

interface HomeProps {}

const Home: React.FC<HomeProps> = ({}) => {
  return (
    <div className="main-wrapper">
      <LeftMainSide />
      <RightMainSide />
    </div>
  );
};

export default Home;
