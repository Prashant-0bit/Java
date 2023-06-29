import React from 'react';
import HeaderBar from './Components/HeaderBar';
import MainFunc from './Components/MainFunc';
import RightComp from './Components/RightComp';
import User from './Components/User';
import Setting from './Components/Setting';
import Footer from './Components/Footer';
import Language from './Components/SubComponents/Language';
import Menu from './Components/Menu';
import RobotMotion from './Components/RobotMotion';
import Message from './Components/Message';
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
          <Route path='/robotmotion' element={<RobotMotion/>}/>
        </Routes>

        <Footer/>
      </>
    </div>
  );
}

export default App;
