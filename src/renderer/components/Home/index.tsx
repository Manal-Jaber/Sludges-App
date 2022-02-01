import { data, Point } from '../Types/index';
import React, { useState } from 'react';
import LeftMainSide from '../LeftMainSide';
import RightMainSide from '../RightMainSide';
import './index.scss';

interface HomeProps {}

const Home: React.FC<HomeProps> = ({}) => {
  const [generatedPoints, setGeneratedPoints] = useState<Point[][]>([]);
  const [namePoint, setNamePoint] = useState('A');
  const [data, setData] = useState<data>({
    id: [],
    name: [],
    x: [],
    y: [],
    zData: [],
    z: [],
  });

  return (
    <div className="main-wrapper">
      <LeftMainSide
        generatedPoints={generatedPoints}
        setGeneratedPoints={setGeneratedPoints}
        namePoint={namePoint}
        setNamePoint={setNamePoint}
        data={data}
        setData={setData}
      />
      {/* <LeftMainSide /> */}
      <RightMainSide
        generatedPoints={generatedPoints}
        data={data}
        setData={setData}
      />
    </div>
  );
};

export default Home;
