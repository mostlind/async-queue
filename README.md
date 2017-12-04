# async-queue
A tiny asynchronous queue implementation

## Usage

```javascript
import AQ from 'async-queue'

let q = AQ.create() // create queue
q.enq(4) // enqueue 4
q.enq(3)

const logFirstTwo = async (q) => {
  let a = await q.deq() // dequeue 4
  let b = await q.deq() // dequeue 3
  console.log(a, b)
}

logFirstTwo() // 4 3

q = AQ.from(['hello', 'how', 'are', 'you']) // create queue from array

const blockingLoop = async (q, fn) => {
  while(true) {
    fn(await q.deq())
  }
}

blockingLoop(q, console.log)
setTimeout(q.enq('today'), 500)
setTimeout(q.enq('?'), 1000)
/*
hello
how
are
you
*** 0.5s delay ***
today
*** 0.5s delay ***
?
*/
```

### Counter With vdom Library

```jsx
const blockingLoop = async (q, fn) => {
  while(true) {
    fn(await q.deq())
  }
}

const initialState = {
  count: 0
}

const q = AQ.from([initialState])

const actions = {
  inc: (state) => q.enq(Object.assign(state, {count: state.count + 1}),
  dec: (state) => q.enq(Object.assign(state, {count: state.count - 1})
}

const Counter = ({state, actions}) => (
  <div>
    <p>Count</p>
    <button onclick={actions.inc}>+</button>
    <h2>{state.count}</h2>
    <button onclick={actions.dec}>-</button>
  </div>
)

const appNode = document.getElementById('app')

const render = (state) => {
  vdomLib.renderToDom(<Counter state={state}, actions={actions} />, appNode)
}

blockingLoop(q, render)

```
