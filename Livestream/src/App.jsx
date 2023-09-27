import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AiFillDelete} from 'react-icons/ai'
import { addOverlays, deleteOverlays, getOverlays } from './redux/overSlice';
const App = () => {
  const dispatch = useDispatch();
  const [livestreamURL, setLivestreamURL] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [newOverlay, setNewOverlay] = useState('');
  const overlays=useSelector((state)=>state.overlays.overlays);
  useEffect(() => {
    // Fetch overlays from the backend
    dispatch(getOverlays());
    console.log("overlays",overlays);
  }, [dispatch]);

  const overlayDelete=async(id)=>{
    await dispatch(deleteOverlays(id));
    await dispatch(getOverlays());
  }
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const addOverlay =async() => {
    // Send a POST request to add a new overlay
    await dispatch(addOverlays({newOverlay,livestreamURL }));
    await dispatch(getOverlays());
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
        <div>
          {overlays && overlays.map((overlay) => (
            <div key={overlay._id} className="mb-2 shadow-inner w-fit p-3 flex">
              <div>
                <h1><span className='font-bold'>LiveStream</span>  {overlay.content}</h1>
                <p><span className='font-bold'>URL  </span>{overlay.url}</p>
              </div>
              <AiFillDelete className='cursor-pointer' color='red' onClick={()=>overlayDelete(overlay._id)}/>
            </div>
          ))}
        </div>
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
      <ToastContainer position='bottom-center' />
    </div>
  );
};

export default App;
