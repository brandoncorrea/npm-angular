function objectsEqual(a: any, b: any): boolean {
  let aKeys = Object.keys(a)
  return aKeys.length === Object.keys(b).length 
    && aKeys.every(key => key in b && areEqual(a[key], b[key]))
}

const isObject = (...es: any[]) =>
  es.every(e => typeof e === 'object')

const areEqual = (a: any, b: any) =>
  a === b ||
  isObject(a, b) &&
  objectsEqual(a, b)

const id = (e: any) => e
const gte = (a: any, b: any) => a >= b
const lt = (a: any, b: any) => a < b

function baseSortBy(coll: any, keyFn: any, isGreater: any) {
  let result = coll.map((i: any) => ({key: keyFn(i), value: i}))
  result.sort((a: any, b: any) => isGreater(a.key, b.key) ? 1 : -1)
  return result.map((i: any) => i.value)
}

const sortBy = (coll: any, keyFn: any) =>
  baseSortBy(coll, keyFn, gte)

const rsortBy = (coll: any, keyFn: any) =>
  baseSortBy(coll, keyFn, lt)

const maxBy = ([first, ...rest]: any, keyFn: any) =>
  rest.reduce((max: any, next: any) => {
    let value = keyFn(next)
    return value > max[1] ? [next, value] : max
  }, [first, keyFn(first)])[0]

export const Core = {
  areEqual,
  id,
  sortBy,
  rsortBy,
  gte,
  lt,
  maxBy
}
