import test from "ava";
import AQ from "../index.js";

test("AQ contains correct functions", t => {
  t.plan(2);
  t.true("create" in AQ);
  t.true("from" in AQ);
});
