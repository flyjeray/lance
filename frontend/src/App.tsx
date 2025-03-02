import { useState } from 'react';
import {
  parseTestMonorepoModelToText,
  TestMonorepoModel,
} from '@lance/shared/models/test';

const TestMonorepoField: TestMonorepoModel = {
  field_1: 'TestMonorepoField',
  field_2: 12,
};

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Vite + React</h1>
      <p>{parseTestMonorepoModelToText(TestMonorepoField)}</p>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
