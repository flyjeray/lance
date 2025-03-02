import { useState } from 'react';
import { AuthAPI } from './api/routers/auth';
import { LOCALSTORAGE_TOKEN_PATH } from './api';

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
    </>
  );
}

export default App;
