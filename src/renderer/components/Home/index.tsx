import React, { useState } from 'react';
import LeftMainSide from '../LeftMainSide';
import RightMainSide from '../RightMainSide';
import './index.scss';

interface HomeProps {}

const Home: React.FC<HomeProps> = ({}) => {
  // const [generatedPoints, setGeneratedPoints] = useState([{}]);
  return (
    <div className="main-wrapper">
      {/* <LeftMainSide generatedPoints={generatedPoints} stGeneratedPoint={setGeneratedPoints} /> */}
      <LeftMainSide />
      <RightMainSide />
    </div>
  );
};

export default Home;
