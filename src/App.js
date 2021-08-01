import { BrowserRouter, Route } from "react-router-dom"
import Home from "./Home/Home"
import GameDetail from "./GameDetail/GameDetail"
import AccountDetail from "./AccountDetail/AccountDetail"
import GameParticipant from "./GameParticipant/GameParticipant";

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
