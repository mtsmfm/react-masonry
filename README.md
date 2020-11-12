# React Masonry

Masonry layout component for React

![demo](demo.png)

CodeSandbox example:
https://codesandbox.io/s/mtsmfmreact-masonry-example-jeh6k

## Usage

```tsx
import * as React from "react";
import Masonry from "@mtsmfm/react-masonry";

export default function App() {
  return (
    <Masonry minColumnWidth={300} gap={10} transition="0.5s">
      {Array.from({ length: 100 }).map((_, index) => {
        const width = 300;
        const height = Math.floor(Math.random() * 1000);

        return (
          <div>
            {index}
            <img
              src={`https://via.placeholder.com/${width}x${height}?text=${index}(${width}x${height})`}
              alt="placeholder"
              style={{ display: "block", width: "100%", height: "100%" }}
            />
          </div>
        );
      })}
    </Masonry>
  );
}
```

## Installation

```
$ npm install --save @mtsmfm/react-masonry
```
