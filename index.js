const a = ({ queue, waiting }) => ({
  enq: x => {
    waiting.length > 0 ? waiting.shift()(x) : queue.unshift(x);
    return;
  },
  deq: async () =>
    queue.length > 0
      ? queue.shift()
      : new Promise((resolve, _reject) => {
          waiting.unshift(resolve);
        })
});

export default {
  create: () => a({ queue: [], waiting: [] }),
  from: arr => a({ queue: [...arr], waiting: [] }),
  of: (...args) => a({ queue: [...args], waiting: [] })
};
