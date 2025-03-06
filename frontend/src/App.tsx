import { useState } from 'react';
import { AuthAPI } from './api/routers/auth';
import { LOCALSTORAGE_TOKEN_PATH } from './api';
import { OrdersAPI } from './api/routers/orders';

function App() {
  const [username, setUsername] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const login = formData.get('login') as string;
    const password = formData.get('password') as string;

    const { data: response } = await AuthAPI.login({ login, password });

    if (response.success) {
      window.localStorage.setItem(LOCALSTORAGE_TOKEN_PATH, response.token);
    }
  };

  const checkMe = async () => {
    const { data: response } = await AuthAPI.me();

    if (response.success) {
      setUsername(response.name);
    }
  };

  const createOrder = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    await OrdersAPI.create({ title, description });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="login"
          name="login"
          placeholder="Login"
          required
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit">Sign In</button>
      </form>

      <button onClick={checkMe}>Me</button>
      {username && <p>{username}</p>}

      <form onSubmit={createOrder}>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Title"
          required
        />
        <input
          type="text"
          id="description"
          name="description"
          placeholder="Description"
          required
        />

        <button type="submit">Create order</button>
      </form>
    </>
  );
}

export default App;
