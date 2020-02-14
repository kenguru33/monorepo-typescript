import React from 'react'
import { Button, LoginForm } from 'ui-component-library'
import { Card } from 'ui-component-library'
import './style.css'

import MyImage from '../public/img/RS108.jpg';

const App = () => (
  <div className="container mx-auto">
    <div className="p-4">
      <Card className="bg-gray-200" imageUrl={MyImage}></Card>
    </div>
    <div className="p-2">
      <Button>Click Me!</Button>
    </div>
  </div>
)
export default App
