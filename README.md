# async-queue
A tiny asynchronous queue implementation

## Usage

```javascript
import AQ from 'async-queue'

let q = AQ.create() // create queue
q.enq(4) // enqueue 4
q.enq(3)

const doSomeStuff = async (q) => {
  let a = await q.deq() // dequeue 4
  let b = await q.deq() // dequeue 3
  console.log(a, b)
}

doSomeStuff() // 4 3

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
