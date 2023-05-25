import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.css';
import AboutPage from './components/AboutPage/AboutPage';
import MainPage from './components/MainPage/MainPage';
import ResultStoryModal from './components/ResultStoryModal/ResultStoryModal';

const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path='/' element={<MainPage />} />
    <Route path='*' element={<MainPage />} />
    <Route path="about" element={<AboutPage />} />
    <Route path="story/:id" element={<MainPage><ResultStoryModal isResultOpen={true} /></MainPage>} />
  </>
))

const App = () => {
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
