import Register from "./components/Register";
import ipConfig from "./ipConfig.json";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Products from "./components/Products";
export const config = {
  endpoint: `http://${ipConfig.workspaceIp}:8082/api/v1`,
};

function App() {
  return (
    
    <div className="App">
<Router>
        <Switch>
         <Route exact path="/register" component={Register} />
         <Route path="/login" component={Login} />
         <Route path="/" component={Products} />
       </Switch>
       </Router>),
      {/* TODO: CRIO_TASK_MODULE_LOGIN - To add configure routes and their mapping */}
          {/* <Register />
          <Login/>  */}
    </div>
  );
}

export default App;
