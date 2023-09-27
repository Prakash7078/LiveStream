import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';

const App = () => {
  const [livestreamURL, setLivestreamURL] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [overlays, setOverlays] = useState([]);
  const [newOverlay, setNewOverlay] = useState('');

  useEffect(() => {
    // Fetch overlays from the backend
    axios.get('/api/overlays').then((response) => {
      setOverlays(response.data);
    });
  }, []);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const addOverlay = () => {
    // Send a POST request to add a new overlay
    axios.post('/api/overlays', { content: newOverlay }).then((response) => {
      // Refresh the list of overlays
      setOverlays([...overlays, response.data]);
      setNewOverlay('');
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Livestream App</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="RTSP URL"
          className="w-full border rounded p-2"
          value={livestreamURL}
          onChange={(e) => setLivestreamURL(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={togglePlay}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Add Overlay"
          className="w-full border rounded p-2"
          value={newOverlay}
          onChange={(e) => setNewOverlay(e.target.value)}
        />
        <button
          className="bg-green-500 text-white px-4 py-2 rounded ml-2"
          onClick={addOverlay}
        >
          Add Overlay
        </button>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Overlays</h2>
        <ul>
          {overlays.map((overlay, index) => (
            <li key={index} className="mb-2">
              {overlay.content}
            </li>
          ))}
        </ul>
      </div>

      <div>
        {livestreamURL && (
          <ReactPlayer
            url={livestreamURL}
            playing={isPlaying}
            controls={true}
            width="100%"
          />
        )}
      </div>
    </div>
  );
};

export default App;
