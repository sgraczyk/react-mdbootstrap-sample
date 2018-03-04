import * as React from 'react';
import { useStrict } from 'mobx';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { Layout } from './components/layout';
import { ExchangeRates } from './containers';
import ExchangeRatesStore from './stores/exchange-rates.store';

import './App.css';

class App extends React.Component {
  constructor(props: {}) {
    super(props);
    useStrict(true);
  }

  render(): JSX.Element {
    const stores = {
      exchangeRatesStore: new ExchangeRatesStore()
    };

    return (
      <Provider {...stores}>
        <Router>
          <Layout>
            <Switch>
              <Route path="/exchange-rates" component={ExchangeRates} />
            </Switch>
          </Layout>
        </Router>
      </Provider>
    );
  }
}

export default App;
