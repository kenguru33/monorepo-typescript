## Add React
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
Change main fielt in package.json
```json
// ...
"main": "dist/index.js",
// ...
Add react as a peer dependency scoped to this package only
```bash
lerna add react --peer --scope=ui-component-library
````
Add react typings as a dev dependency scoped to react packages. (Run this for every react package)
Put this in the package tsconfig.json file
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
Then add a ui component. e.g.

```javascript 
// packages/ui-component-library/components/Button.tsx
import React from 'react'
export const Button = () => (<button>Push Button</button>)
```
Import adn rexport components from index.ts
```javascript
import { Button } from './components/Button'

export = {
  Button
}
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

  