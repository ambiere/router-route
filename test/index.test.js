// import fs from 'node:fs'
import { test, assert } from 'vitest'
import RrRoute from '../src/index.js'
import customRouteObject from './fixture/customRouteObject'
import standardRouteObject from './fixture/standardRouteObject'

const it = test.extend({
  routeMap: customRouteObject,
  routeObject: standardRouteObject
})

it('should parse custom route object to a react-router compatible route object',
  function testRrRoute({ routeMap, routeObject }) {
    const rrRoute = new RrRoute(routeMap)
    const rrRouteObject = rrRoute.routeObject()

    assert.isOk(rrRouteObject, 'returned route object')
    assert.isArray(rrRouteObject)
    assert.equal(
      JSON.stringify(rrRouteObject),
      JSON.stringify(routeObject),
      'Returned react-router compatible route object'
    )
  }
)
