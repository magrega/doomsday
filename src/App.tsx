import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from './components/MainPage/MainPage';
import AboutPage from './components/AboutPage/AboutPage';
import './App.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
]);

const App = () => {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
