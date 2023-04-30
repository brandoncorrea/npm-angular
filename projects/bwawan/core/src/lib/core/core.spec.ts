import { Core } from './core'

describe('Core', () => {
  it('areEqual', () => {
    expect(Core.areEqual(1, 1)).toBeTruthy()
    expect(Core.areEqual(1, 0)).toBeFalsy()
    expect(Core.areEqual(0, 1)).toBeFalsy()
    expect(Core.areEqual({}, {})).toBeTruthy()
    expect(Core.areEqual({ x: 1 }, {})).toBeFalsy()
    expect(Core.areEqual({ x: undefined }, {})).toBeFalsy()
    expect(Core.areEqual({ x: undefined }, { y: undefined })).toBeFalsy()
    expect(Core.areEqual({ x: undefined }, { x: undefined })).toBeTruthy()
    expect(Core.areEqual({ x: undefined }, { x: undefined, y: undefined })).toBeFalsy()
    expect(Core.areEqual({ x: {} }, { x: {} })).toBeTruthy()
    expect(Core.areEqual({ x: { y: { z: 'hello' } } }, { x: { y: { z: 'hello' } } })).toBeTruthy()
  })

  it('id', () => {
    expect(Core.id(null)).toBeNull()
    let object = {}
    expect(Core.id(object)).toBe(object)
  })

  it('sortBy', () => {
    expect(Core.sortBy([], Core.id)).toEqual([])
    expect(Core.sortBy([1], Core.id)).toEqual([1])
    expect(Core.sortBy([2, 1], Core.id)).toEqual([1, 2])
    expect(Core.sortBy([1, 2], Core.id)).toEqual([1, 2])
    expect(Core.sortBy([1, 2], (i: any) => -i)).toEqual([2, 1])
    
    let unmodified = [3, 1, 2]
    let sorted = Core.sortBy(unmodified, Core.id)
    expect(sorted).not.toEqual(unmodified)

    let invocations = 0
    Core.sortBy([1, 2, 3], () => invocations++)
    expect(invocations).toBe(3)

    expect(Core.sortBy([{x: 1, y: 2}, {x: 1, y: 3}], (i: any) => i.x))
    .toEqual([{x: 1, y: 2}, {x: 1, y: 3}])
  })

  it('rsortBy', () => {
    expect(Core.rsortBy([], Core.id)).toEqual([])
    expect(Core.rsortBy([1], Core.id)).toEqual([1])
    expect(Core.rsortBy([2, 1], Core.id)).toEqual([2, 1])
    expect(Core.rsortBy([1, 2], Core.id)).toEqual([2, 1])
    expect(Core.rsortBy([1, 2], (i: any) => -i)).toEqual([1, 2])
    
    expect(Core.rsortBy([{x: 1, y: 2}, {x: 1, y: 3}], (i: any) => i.x))
    .toEqual([{x: 1, y: 3}, {x: 1, y: 2}])
    
    let unmodified = [3, 1, 2]
    let sorted = Core.rsortBy(unmodified, Core.id)
    expect(sorted).not.toEqual(unmodified)

    let invocations = 0
    Core.rsortBy([1, 2, 3], () => invocations++)
    expect(invocations).toBe(3)
  })

  it('maxBy', () => {
    expect(Core.maxBy([], Core.id)).toBeUndefined()
    expect(Core.maxBy([null], Core.id)).toBeNull()
    expect(Core.maxBy([1, 2], Core.id)).toBe(2)
    expect(Core.maxBy([{x: 1}, {x: 2}], (i: any) => i.x)).toEqual({x: 2})
  })
})
