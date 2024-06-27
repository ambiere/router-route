import { test, assert } from 'vitest'
import RouterRoute from '../src/index.js'
import customRouteObject from './fixture/customRouteObject'
import standardRouteObject from './fixture/standardRouteObject'

const it = test.extend({
  routeMap: customRouteObject,
  routeObject: standardRouteObject
})

it('should parse custom route object to a react-router compatible route object',
  function testRouterRoute ({ routeMap, routeObject }) {
    const routerRoute = new RouterRoute(routeMap)
    const routerRouteObject = routerRoute.routeObject()

    assert.isOk(routerRouteObject, 'returned route object')
    assert.isArray(routerRouteObject)
    assert.equal(
      JSON.stringify(routerRouteObject),
      JSON.stringify(routeObject),
      'Returned react-router compatible route object'
    )
  }
)
