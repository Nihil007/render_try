import { useState } from 'react';
import { submitUser } from './services/api';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    if (!name || !email) {
      setMessage('Please fill all fields');
      return;
    }

    try {
      const res = await submitUser({ name, email });
      setMessage(res.message);
    } catch (err) {
      setMessage('Server error');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>React → Node → MongoDB</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      /><br /><br />

      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      /><br /><br />

      <button onClick={handleSubmit}>Submit</button>

      <p>{message}</p>
    </div>
  );
}

export default App;
