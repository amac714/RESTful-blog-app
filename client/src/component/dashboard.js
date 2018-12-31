import React from 'react';
import DisplayPosts from './displayPosts';
import { Header } from './header';

const Dashboard = () => (
  <div>
    <Header />
    <DisplayPosts />
  </div>
);

export default Dashboard;