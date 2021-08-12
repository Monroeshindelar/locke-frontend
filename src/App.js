import { BrowserRouter, Route } from "react-router-dom"
import Home from "./Components/Home/Home"
import GameDetail from "./Components/GameDetail/GameDetail"
import AccountDetail from "./Components/AccountDetail/AccountDetail"
import GameParticipant from "./Components/GameParticipantDetail/GameParticipantDetail";

function App() {
  return (
    <BrowserRouter>
      <Route path='/' exact component={Home} />
      <Route path='/GameDetail' exact component={GameDetail} />
      <Route path='/AccountDetail' exact component={AccountDetail} />
      <Route path='/GameParticipant' exact component={GameParticipant} />
    </BrowserRouter>
  );
}

export default App;
