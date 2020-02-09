## Add React
### Create a ui component library package
Create a shared ui componenr library that can be used across the monorepo packages.
```bash
mkdir packages/ui-component-library
cd packages/ui-componinent-library
mkdir src
touch src/index.ts
mkdir src/components
touch tsconfig.json
```
Initialize package
```bash
npm init -y
```
Change main field in package.json to point to the transpiled entry file.
```json
// ...
"main": "dist/index.js",
// ...
```
Add react as a peer dependency scoped to this package only
```bash
lerna add react --peer --scope=ui-component-library
````
Add react typings as a develop dependency scoped to react packages. (Run this for every react package)
```bash
lerna add @typings/react --dev --scope=ui-component-library
```
Setup up the typescript compiler option byt putting this in the package tsconfig.json file
```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "jsx": "react",
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "exclude": [
    "node_modules",
    "dist"
  ]
}
```
Then add a ui component. For an example we will keep it simple and create only a button. Crete a file named Button.jsx in the components library.

```javascript 
// packages/ui-component-library/components/Button.tsx
import React from 'react'
export const Button = () => (<button>Push Button</button>)
```
Import and reexport all the components from index.ts
```javascript
export * from './components/Button'
```
Add build scripts to package.json
```json
// ...
"script": {
  // ...
  "compile": "tsc -b tsconfig.json",
  "clean": "rm -rf ./dist && rm -rf tsconfig.tsbuildinfo",
  "build": "npm run clean && npm run compile",
}
```
### Add React Application

Create a ui-app packages that will make use of the component librar.
```bash
mkdir ui-app
cd ui-app
mkdir src
touch src/index.ts
touch tsconfig.ts
````
Initialize package
```bash
rpm init -y
```
Change main field in package.json to point to the transpiled typescript file.
```json
// ...
"main": "dist/index.js",
// ...
```
Add ui-component-library as a dependency in package.json
```json
"devDependencies": {
    // ...
    "ui-component-library": "1.0.0"
    // ...
  }
```
After you have added a package to dependencies, run
```bash
lerna bootstrap
```
Add react and react-dom to the package dependcies scoped to this package only
```bash
lerna add react --scope=ui-app
lerna add @types/react --dev --scope=ui-app
lerna add react-dom --scope ui-app
lerna add @types/react-dom --dev --scope=ui-app 
````
Put this in the package tsconfig.json file
```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "jsx": "react",
    "lib": [
      "ES6",
      "DOM"
    ],
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "references": [
    {
      "path": "../shared"
    },
    {
      "path": "../ui-component-library"
    }
  ],
  "exclude": [
    "node_modules",
    "dist"
  ]
}
```

> **_NOTE:_**  We have added the lib property to transpile for the dom.

Create index.html file to serve the application
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="root"></div>
  <script src='./index.ts'></script>
</body>
</html>
```
Next, we will use parceljs to bundle the react app for the browser.

Install parcel-bundle as a develop dependency scoped to this package
```bash
lerna add parcel-bundler --dev --scope=ui-app
```
Add build and start scripts to package.json
```json
// ...
"scripts": {
    // ...
    "compile": "parcel build ./src/index.html",
    "clean": "rm -rf ./dist",
    "build": "npm run clean && npm run compile",
    "start": "parcel ./src/index.html",
  },
  ```
Now we wil create something show up in the browser.

First create the App component which wil be the React Application root component. Do this by adding App.jsx file in the src folder
```javascript
//src/App.jsx
import React from 'react'
import { Button } from 'ui-component-library'

const App = () => (
  <div>
    <h1>Application</h1>
    <Button></Button>
  </div>
)
export default App
```

Then add this to the index.ts file:
```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(React.createElement(App), document.getElementById('root'))

```
To build the whole monorepo in one go, you can do that with the use of lerna.
```bash
lerna run build
````
You are now ready to give the application a spin :)
```bash
lerna run start
```
