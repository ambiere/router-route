# rr-route

> Utility package designed to simplify the process of defining routes in `react-router`.

rr-route takes a custom route map and convert it into a standard route object that can be directly
used with react-router's `createBrowserRouter` API. This package streamlines the management of complex
route hierarchies by linking parents and children routes through reference keys, ensuring a clean and
organized route structure.

## Features

###  Custom Route map
Define your routes using a custom map with parent-child references.

```ts
interface Parent extends Omit<RouteObject, "children"> {
  /** Reference key to children routes*/
  childrenRef?: string | number
}

interface RouteMap {
  parents: Parent[]
  childrens: Record<string | number, RouteMap>
}
```

### Automatic Conversion
Effortlessly convert the custom route map into a standard route object for use with `createBrowserRouter` API.

### Simplified management
Easily manage and organize complex route hierarchies with reference keys.

### Recursive Building
Recursively constructs the route tree, linking parent routes to their respective children.


## Installation

```bash
npm install @ambiere/rr-route

```

## Usage

```js
import RrRoute from "@ambiere/rr-route"

const routeMap = {
  parents: [
    {
      element: <RootLayout />,
      errorElement: <RootError />,
      childrenRef: '_rootChildRef' /** Reference key to its child route*/
    }
  ],

  childrens: {
    "_rootChildRef": { /** Children of RootLayout*/
      parents: [
        {
          path: "/",
          element: <Home />,
        }
      ],
      childrens: {} /** Children of RootLayout's children (if any)*/
    }
  }
}

const rrRoute = new RrRoute(routeMap)
const rrRouteObject = rrRoute.routeObject()

createBrowserRouter(rrRouteObject, options)
```

## API

- `RrRoute(routeMap: RouteMap): RrRoute`
  - rr-route class

  - Parameters:
    - `routeMap` (Object):<br/> The custom route map containing `parents` and `childrens` arrays.

  - Returns:
    - Instance of `RrRoute` containing `routeObject` method

- `routeObject(): RouteObject[]`
  - Converts custom route map into a standard route object.

  - Returns:
    - A standard route object compatible with react-router's `createBrowserRouter` API/method.

## License

This project is licensed under the MIT License.


