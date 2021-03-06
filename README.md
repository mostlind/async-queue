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
  // while there are items in the queue call the function with item from queue,
  // if the queue is empty, block until an item is added
  while(true) { 
    fn(await q.deq()) 
  }
}

blockingLoop(q, console.log)
setTimeout(() => q.enq('today'), 500)
setTimeout(() => q.enq('?'), 1000)
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
const Counter = ({state, actions}) => (
  <div>
    <p>Count</p>
    <button onclick={() => actions.inc(state)}>+</button>
    <h2>{state.count}</h2>
    <button onclick={() => actions.dec(state)}>-</button>
  </div>
)

const actions = (q) => ({
  inc: ({count}) => q.enq({count: count + 1}),
  dec: ({count}) => q.enq({count: count - 1})
})

const q = AQ.of({ count: 0 })

const render = (state) => vdomLib.render(
  <Counter state={state}, actions={actions(q)} />, 
  document.getElementById('app'))

(async (q, fn) => {
  while(true) {
    fn(await q.deq())
  }
})(q, render)

```
