// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from '../public/Dashboard';
import Login from '../public/Login';
import Register from '../public/components/Register';
import ForgotPassword from '../public/ForgotPassword';
import Questions from '../public/components/Questions';
import Home from '../public/Home';
import ListeningModule from '../public/ListeningModule';
import ReadingModule from '../public/components/ReadingModule';
import SpeakingModule from '../public/components/SpeakingModule';
import WritingModule from 'WritingModule';
import UserProfile from '../public/components/UserProfile';
import NotFound from '../public/components/NotFound';
import Navigation from '../public/Navigation';
import './App.css';

const App = () => (
  <Router>
    <div className="app">
      <Navigation />
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/questions" component={Questions} />
        <Route path="/home" component={Home} />
        <Route path="/listening" component={ListeningModule} />
        <Route path="/reading" component={ReadingModule} />
        <Route path="/speaking" component={SpeakingModule} />
        <Route path="/writing" component={WritingModule} />
        <Route path="/profile" component={UserProfile} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);

export default App;