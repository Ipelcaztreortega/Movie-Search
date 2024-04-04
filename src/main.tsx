import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import MovieDetail from "./components/MovieDetail.tsx";
import { SearchResultProvider } from './components/SearchResultContext'; // Import SearchResultProvider

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SearchResultProvider>
        <Routes>
          
            <Route path="/" element={<App/>}/>
            <Route path="/movie/:imdbID" element={<MovieDetail />} />

        </Routes>
      </SearchResultProvider>
    </BrowserRouter>
    
  </React.StrictMode>,
)
