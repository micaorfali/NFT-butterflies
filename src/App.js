import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import OnboardProvider from "./contexts/OnboardContext";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <OnboardProvider>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </OnboardProvider>
      </Router>
    </div>
  );
}

export default App;
