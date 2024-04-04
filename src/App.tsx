import { useState } from 'react';
import MovieSearch from './components/MovieSearch';
import './App.css'

function App() {

  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <div className="app-container">
      <MovieSearch 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery} 
      />
    </div>
  )
}

export default App;
