import { useState } from 'react';
import styled from 'styled-components';

import { env } from './env.client';
import { useCNBRates } from './hooks/use-cnb-rates';

const Button = styled.button`
  background-color: #000;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

export function App() {
  const [count, setCount] = useState(0);
  const { data } = useCNBRates();
  console.log(data);

  return (
    <>
      <h1>Momence Task</h1>
      {env.VITE_APP_URL}
      <pre>{data}</pre>
      <Button onClick={() => setCount(count => count + 1)}>
        count is {count}
      </Button>
    </>
  );
}
