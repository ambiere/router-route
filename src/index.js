/**
 * Create standard route object
 * from `rr-route` custom route map
 * @class
 * @type {import(".").default}
 * */
export default class RrRoute {
  constructor(routeMap) {
    this.routeMap = this.#formatRouteMap(routeMap)
  }

  /**
   * Format routeMap to required format
   * (`RouteMap`) if .parent contains route modules
   * @param {import(".").RouteMap} routeMap
   * @returns {import('.').Parent}
   * */
  #formatRouteMap(routeMap) {
    const routeMapFmt = {
      parents: [],
      childrens: routeMap.childrens
    }

    let x = 0

    while (x < routeMap.parents.length) {
      const route = routeMap.parents[x]
      if (this.#isRouteModule(route)) {
        route.parents.map(parent => {
          const ref = parent.childrenRef
          if (ref) {
            const childrens = routeMapFmt.childrens
            Object.defineProperty(childrens, ref, {
              value: route.childrens[ref],
              enumerable: true
            })
          }
          return routeMapFmt.parents.push(parent)
        })
      } else { routeMapFmt.parents.push(route) }
      x++
    }
    return routeMapFmt
  }

  /**
   * Check if the route is a module
   * @param {import("./").RouteMap} route
   * */
  #isRouteModule(route) {
    return Boolean(
      (route.parents && route.parents.length) ||
      route.childrens
    )
  }

  /**
   * @private
   * @param {import(".").Parent} parent
   * @returns {Omit<Parent, "childrenRef"}
   * */
  #copyRouteParent(parent) {
    const parentCopy = { ...parent }
    delete parentCopy.childrenRef
    return parentCopy
  }

  /**
   * @private
   * @param {import(".").ChildMap} childMap
   * @returns {import(".").RouteObject[]}
   * */
  #readChildMap(childMap) {
    const childRouteObject = []
    childMap.parents.forEach(parent => {
      const children = this.#childRoute(parent, childMap)
      const parentCopy = this.#copyRouteParent(parent)

      childRouteObject.push({
        ...parentCopy,
        ...children
      })
    })
    return childRouteObject
  }

  /**
   * @private
   * @param {import(".").Parent} parent
   * @param {import(".").RouteMap} [rootParent=this.routeMap]
   * @returns {Record<string, import(".").RouteObject[] | unknown>}
   * */
  #childRoute(parent, rootParent = this.routeMap) {
    const childrenRef = parent.childrenRef ?? ''
    const children = () => {
      const childrens = rootParent.childrens[childrenRef]
      const fmtChildMap = this.#formatRouteMap(childrens)
      return this.#readChildMap(fmtChildMap)
    }
    return parent.childrenRef ? { children: children() } : {}
  }

  /**
   * Return route object compatible with
   * `createBrowserRouter` API/method of react-router
   * @returns {import(".").RouteObject[]}
   * */
  routeObject() {
    const routeObject = []
    this.routeMap.parents.forEach(parent => {
      const children = this.#childRoute(parent)
      const parentCopy = this.#copyRouteParent(parent)

      routeObject.push({
        ...parentCopy,
        ...children
      })
    })
    return routeObject
  }
}
