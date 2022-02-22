import { BrowserRouter } from 'react-router-dom';

import AppRouter from './components/AppRouter/AppRouter';

const App = () => {
  return (
    <div className='main-app'>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  );
};

export default App;
