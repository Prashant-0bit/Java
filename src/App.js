import React from 'react';
import ActualPosition from './Components/ActualPosition';
import BaseSelection from './Components/BaseSelection';
import HeaderBar from './Components/HeaderBar';
import HomePosition from './Components/HomePosition';
import MainFunc from './Components/MainFunc';
import Message from './Components/Message';
import moment from 'moment-timezone';
import RightComp from './Components/RightComp';
import RobotMotion from './Components/RobotMotion';
import Setting from './Components/Setting';
import ToolSelection from './Components/ToolSelection';
import User from './Components/User';
import './Global.css';
import { Route, Routes } from "react-router-dom"

moment.tz.load(require('moment-timezone/data/packed/latest.json'));

function App() {
  return (
    <div className="App">
      <>
        <HeaderBar/>
        <Message />
        <RightComp/>
        <Routes>
          <Route path='/' element={<MainFunc/>} />
          <Route path='users' element={<User />} />
          <Route path='/settings' element={<Setting />} />
          <Route path='robot-motion' element={<RobotMotion/>}>
            <Route index element={<ActualPosition/>} />
            <Route path='actual-position' element={<ActualPosition />} />
            <Route path='home-position' element={<HomePosition />} />
            <Route path='base-selection' element={<BaseSelection/>} />
            <Route path='tool-selection' element={<ToolSelection />} />
          </Route>
        </Routes>
      </>
    </div>
  );
}

export default App;