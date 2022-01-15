import { Point } from '../Types/index';
import React, { useState } from 'react';
import LeftMainSide from '../LeftMainSide';
import RightMainSide from '../RightMainSide';
import './index.scss';

interface HomeProps {}

const Home: React.FC<HomeProps> = ({}) => {
  const [generatedPoints, setGeneratedPoints] = useState<Point[][]>([]);
  const [namePoint, setNamePoint] = useState('A');

  return (
    <div className="main-wrapper">
      <LeftMainSide
        generatedPoints={generatedPoints}
        setGeneratedPoints={setGeneratedPoints}
        namePoint={namePoint}
        setNamePoint={setNamePoint}
      />
      {/* <LeftMainSide /> */}
      <RightMainSide />
    </div>
  );
};

export default Home;
