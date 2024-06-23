import type { RouteObject } from "react-router"

export { RouteObject }
export interface Parent extends Omit<RouteObject, "children"> {
  /** Reference key to children routes*/
  childrenRef?: string | number
}

export interface ChildMap extends Parent { }

/** Custom route object with children reference key in parent route, and childrens map for children routes*/
export interface RouteMap {
  parents: Parent[]
  childrens: Record<string | number, RouteMap>
}

declare class RrRoute {
  private routeMap: RouteMap
  constructor(routeMap: RouteMap)
  private copyRouteParent(parent: Parent): Omit<Parent, "childrenRef">
  private readChildMap(childMap: ChildMap): RouteObject[]
  private childRoute(parent: Parent, rootParent?: RouteMap): Record<string, RouteObject[] | unknown>
  /** Return route object compatible with `createBrowserRouter` API/method of react-router*/
  routeObject(): RouteObject[]
}

export default RrRoute
