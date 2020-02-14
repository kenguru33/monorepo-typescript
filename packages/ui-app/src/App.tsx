import React from 'react'
import './style.css'
import { Button, LoginForm } from 'ui-component-library'
import { Card } from 'ui-component-library'
const App = () => (
  <div className="container mx-auto">
    <div className="p-4">
      <Card className="bg-gray-800"></Card>
    </div>
    <div className="p-2">
      <Button>Click Me!</Button>
    </div>
  </div>
)
export default App
