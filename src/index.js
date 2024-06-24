/**
 * @class
 * @type {import(".").default}
 * */
export default class RrRoute {
  constructor(routeMap) {
    this.routeMap = routeMap
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
    const children = () => this.#readChildMap(rootParent.childrens[childrenRef])
    return parent.childrenRef
      ? {
        children: children()
      }
      : {}
  }

  /**
   * Return route object compatible with `createBrowserRouter` API/method of react-router
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
