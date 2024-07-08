import React from "react";
import { useState, useEffect } from "react";
const Index = () => {
  const [count, setCount] = useState(0);
  const plus = () => {
    setCount();
  };
  useEffect(() => {
    console.log("Count", count);
  }, [count]);
  return (
    <div className="flex w-full h-full items-center flex-col">
      <h1>Count : {count}</h1>
      <div>
        <button
          className="bg-green-500 p-10"
          onClick={() => setCount(count + 1)}
        >
          +
        </button>
        <button className="bg-red-500 p-10" onClick={() => setCount(count - 1)}>
          -
        </button>
      </div>
    </div>
  );
};

export default Index;
