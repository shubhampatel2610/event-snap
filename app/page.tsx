"use client";

import { decrement, increment } from "./store/dashboardSlice";
import { useAppDispatch, useAppSelector } from "./store/store";

export default function Home() {
  const dispatch = useAppDispatch();
  const val = useAppSelector((state) => state.dashboard.value);

  return (
    <>
      Hello World<div>{val}</div>
      <button onClick={() => dispatch(increment())}>Click Me</button>
      <button onClick={() => dispatch(decrement())}>Click Me</button>
    </>
  );
}
