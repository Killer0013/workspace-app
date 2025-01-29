const React = require('react');
const ReactDOM = require('react-dom');
const { ipcRenderer } = require('electron');

function Login() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleLogin = () => {
        ipcRenderer.send('login', { username, password });
    };

    return (
        <div style={{ padding: '20px' }}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

ReactDOM.render(<Login />, document.getElementById('root'));