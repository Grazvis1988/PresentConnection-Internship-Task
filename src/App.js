import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import ListTabel from './components/ListTabel'
import ListItem from './components/ListItem'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div>
      <Header />
        <Routes>
          <Route path="/" element={<ListTabel />}/>
          <Route path="/:id" element={<ListItem />}/>
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
