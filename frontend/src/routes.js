import StartPage from './pages/StartPage/StartPage';
import CreateRoomPage from './pages/CreateRoomPage.jsx/CreateRoomPage';
import { START_PAGE, CREATE_ROOM_PAGE } from './utils/constants';

export const Routes = [
  { path: START_PAGE, Component: StartPage },
  { path: CREATE_ROOM_PAGE, Component: CreateRoomPage },
];
