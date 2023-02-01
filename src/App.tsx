import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';

import Dialogue from "./page/Dialogue";
import Editor from "./page/Editor";
import Help from "./page/Help";
import Home from './page/Home';
import LadingPage from './page/LadingPage';
import Login from './page/Login';
import Singin from './page/Singin';
import Wellcome from "./page/Wellcome";

type AppProps = {
  isStart?: boolean
}

function App(props: AppProps) {
  return (
    // <>
    //   {/* {props.isStart ? <Wellcome /> : true} */}
    //   <Wellcome />
    // </>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LadingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/wellcome" element={<Wellcome />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/dialogue" element={<Dialogue />} />
        <Route path="/help" element={<Help />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sigin" element={<Singin />} />
      </Routes>
    </BrowserRouter >
  )
}

export default App;

