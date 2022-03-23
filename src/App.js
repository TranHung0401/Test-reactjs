import {
  BrowserRouter as Router, Link, Route, Routes
} from "react-router-dom";
import { Menu, Layout } from 'antd';
import './App.css';
import Login from './components/Login'
import User from './components/User'

function App() {

  const { Content } = Layout;

  return (
    <div className="App">
      <Layout>
        <Content style={{ padding: '10px' }}>
          <Router>
            <Menu mode="horizontal" style={{ marginBottom: '20px' }}>
              <Menu.Item key="home">
                <Link className='text-link' to='/'>Home</Link>
              </Menu.Item>
              <Menu.Item key="login">
                <Link className='text-link' to='/login'>Login</Link>
              </Menu.Item>

            </Menu>

            <Routes >
              <Route exact path="/" />
              <Route path="/login" element={<Login />} />
              <Route path="/user" element={<User />} />

            </Routes>
          </Router >
        </Content>
      </Layout>

    </div >
  );
}

export default App;
