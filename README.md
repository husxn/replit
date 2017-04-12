# React Repl
A small react library to render a terminal emulator

## Installation(dev)
```bash
$ git clone https://github.com/Husseinfarah93/replit.git
$ npm install
$ npm start
```
Go to localhost:1337

## Installation(lib)
1. Install
```bash
  npm install --save react-replEmulator
```
2. Import
```js
  import Repl from 'react-replEmulator'
```
3. Use
```js
  <Repl></Repl>
```
## API
#### Optional Properties
- **height** *(string)*  
  This sets the height of the console. By default the console height is 100% of the body height. 
```js
  <Repl height="100px" />
```
- **width** *(string)*  
  This sets the width of the console. By default the console width is 100% of the body width. 
```js
  <Repl width="500px" />
```
- **textColour** *(string)*  
  This sets the colour of the text within the console. By default the text colour is ![#97ED8A](https://placehold.it/15/97ED8A/000000?text=+) `#97ED8A`
```js
  <Repl textColour="red" /> || <Repl textColour="#B64926" />
```


## Preview: 
#### Console UI:
![](https://i.gyazo.com/a344bf8742f036451c9de653dd0bfee4.png)


