import React, { Suspense } from 'react';

const Router = React.lazy(() => import('./router'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <Router />
      </Suspense>
    </div>
  );
}

export default App;
