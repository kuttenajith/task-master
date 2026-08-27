import { useState } from 'react';

import { Description } from './Description';
import { Implementation } from './components/Implementation';
import './App.scss';

export const App = () => {
  const [isDescription, setIsDescription] = useState(true);

  return (
    <div className="App">
      <header className="app-banner">
        <div>
          <p className="app-kicker">Interactive floor plans</p>
          <h1 className="app-title">Task Master</h1>
        </div>
        <div className="tabs" role="tablist" aria-label="App sections">
          <button
            type="button"
            role="tab"
            aria-selected={isDescription}
            className={isDescription ? 'active' : ''}
            onClick={() => setIsDescription(true)}
          >
            Description
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={!isDescription}
            className={!isDescription ? 'active' : ''}
            onClick={() => setIsDescription(false)}
          >
            Implementation
          </button>
        </div>
      </header>

      <div className="content">{isDescription ? <Description /> : <Implementation />}</div>
    </div>
  );
};

export default App;
