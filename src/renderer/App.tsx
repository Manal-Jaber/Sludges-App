import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import FramelessNav from './components/FramelessNav';
import Home from './components/Home';

export default function App() {
  return (
    <>
      <FramelessNav />
      <Router>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </>
  );
}
