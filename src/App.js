import React, { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import ListTabel from './components/ListTabel'
import ListItem from './components/ListItem'
import { Route, Routes } from 'react-router-dom'

function App() {
  const [page, setPage] = useState(0)
  return (
    <div>
      <Header />
        <Routes>
          <Route path="/" element={<ListTabel page={page} setPage={setPage}/>}/>
          <Route path="/item/:id" element={<ListItem />}/>
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
