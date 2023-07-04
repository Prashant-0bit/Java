import React from 'react';
import ActualPosition from './Components/ActualPosition';
import BaseCoodinate from './Components/BaseCoodinate';
import Footer from './Components/Footer';
import HeaderBar from './Components/HeaderBar';
import HomePosition from './Components/HomePosition';
import Language from './Components/SubComponents/Language';
import MainFunc from './Components/MainFunc';
import Menu from './Components/Menu';
import Message from './Components/Message';
import RightComp from './Components/RightComp';
import RobotMotion from './Components/RobotMotion';
import Setting from './Components/Setting';
import ToolCoordinate from './Components/ToolCoordinate';
import User from './Components/User';
import './Global.css';
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <>
        <HeaderBar/>
        <Message />
        <RightComp/>
        <Routes>
          <Route path='/' element={<MainFunc/>} />
          <Route path='/users' element={<User />} />
          <Route path='/settings' element={<Setting />} />
          <Route path='/languages' element={<Language />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='robot-motion' element={<RobotMotion/>}>
            <Route index element={<ActualPosition/>} />
            <Route path='actual-position' element={<ActualPosition />} />
            <Route path='home-position' element={<HomePosition />} />
            <Route path='base-coordinate' element={<BaseCoodinate />} />
            <Route path='tool-coordinate' element={<ToolCoordinate />} />
          </Route>
        </Routes>

        <Footer/>
      </>
    </div>
  );
}

export default App;
