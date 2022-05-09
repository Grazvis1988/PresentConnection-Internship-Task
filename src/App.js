import Header from './components/Header'
import Footer from './components/Footer'
import List from './components/List'
import ListItem from './components/ListItem'
import { Route, Switch } from 'react-router-dom'

function App() {
  return (
    <>
      <Header />
        <Switch>
          <Route path="/">
            <List />
          </Route>
          <Route path="/:id">
            <ListItem />
          </Route>
        </Switch>
      <Footer />
    </>
  );
}

export default App;
