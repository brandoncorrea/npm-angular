import { DbService } from './db.service'

describe('Db Service', () => {
  let db: DbService
  beforeEach(() => db = new DbService())

  it('saves a null entity', () =>
    expect(() => db.save(null))
    .toThrow('missing id'))

  it('saves an entity missing an id', () =>
    expect(() => db.save({ foo: 1234 }))
    .toThrow('missing id'))
  
  it('saves an entity that only has an id', () => {
    db.save({ id: 3 })
    expect(db.all()).toEqual([{ id: 3 }])
  })

  it('saves many entities', () => {
    let e1 = { id: 1, foo: 'bar' }
    let e2 = { id: 2, foo: 'baz' }
    let e3 = { id: 3, foo: 'buzz' }
    db.saveAll([e1, e2, e3])
    expect(db.all()).toEqual([e1, e2, e3])
  })

  it('overwrites existing entities', () => {
    db.save({ id: 3 })
    db.save({ id: 3, foo: 'bar' })
    expect(db.all()).toEqual([{ id: 3, foo: 'bar' }])
  })
  
  it('deletes by id', () => {
    db.save({ id: 3, foo: 'bar' })
    db.delete(3)
    expect(db.all()).toEqual([])
  })

  it('deletes by entity', () => {
    db.save({ id: 3, foo: 'bar' })
    db.delete({ id: 3 })
    expect(db.all()).toEqual([])
  })

  it('deletes multiple items', () => {
    db.save({ id: 3, foo: 'bar' })
    db.save({ id: 5, foo: 'baz' })
    db.delete({ id: 3 }, 5)
    expect(db.all()).toEqual([])
  })
  
  it('deletes all items', () => {
    db.save(
      { id: 1, foo: 'bar'},
      { id: 2, foo: 'baz'},
      { id: 3, foo: 'buzz'}
    )
    db.clear()
    expect(db.all()).toEqual([])
  })

  it('finds entities by predicate', () => {
    let e1 = { id: 1, foo: 'bar'}
    let e2 = { id: 3, foo: 'baz'}
    let e3 = { id: 6, foo: 'bar'}
    db.save(e1, e2, e3)
    expect(db.findWhere((i: any) => i.id % 3 === 0)).toEqual([e2, e3])
    expect(db.findWhere((i: any) => i.foo === 'bar')).toEqual([e1, e3])
    expect(db.findWhere((i: any) => i.foo === 'baz')).toEqual([e2])
  })

  it('finds first entity by predicate', () => {
    let e1 = { id: 1, foo: 'bar'}
    let e2 = { id: 3, foo: 'baz'}
    let e3 = { id: 6, foo: 'buzz'}
    db.save(e1, e2, e3)
    expect(db.firstWhere((i: any) => i.id % 3 === 0)).toEqual(e2)
    expect(db.firstWhere((i: any) => i.foo === 'bar')).toEqual(e1)
    expect(db.firstWhere((i: any) => i.foo === 'buzz')).toEqual(e3)
  })
  
  it('finds entities with matching properties', () => {
    let e1 = { id: 1, foo: 'bar'}
    let e2 = { id: 3, foo: 'baz'}
    let e3 = { id: 6, foo: 'bar'}
    db.save(e1, e2, e3)
    expect(db.findBy({})).toEqual([e1, e2, e3])
    expect(db.findBy({ id: 3 })).toEqual([e2])
    expect(db.findBy({ foo: 'bar' })).toEqual([e1, e3])
    expect(db.findBy({ id: 6, foo: 'bar' })).toEqual([e3])
  })

  it('finds first entity with matching properties', () => {
    let e1 = { id: 1, foo: 'bar'}
    let e2 = { id: 3, foo: 'baz'}
    let e3 = { id: 6, foo: 'bar'}
    db.save(e1, e2, e3)
    expect(db.firstBy({})).toEqual(e1)
    expect(db.firstBy({ id: 3 })).toEqual(e2)
    expect(db.firstBy({ foo: 'bar' })).toEqual(e1)
    expect(db.firstBy({ id: 6, foo: 'bar' })).toEqual(e3)
  })

  it('finds entities by id', () => {
    let e1 = { id: 1, foo: 'bar' }
    let e2 = { id: 3, foo: 'baz' }
    db.save(e1, e2)
    expect(db.get(1)).toEqual(e1)
    expect(db.get(2)).toBeNull()
    expect(db.get(3)).toEqual(e2)
  })

  it('counts all entities', () => {
    let e1 = { id: 1, foo: 'bar'}
    let e2 = { id: 3, foo: 'baz'}
    let e3 = { id: 6, foo: 'bar'}
    db.save(e1, e2, e3)
    expect(db.all()).toEqual([e1, e2, e3])
  })

  it('counts entities by predicate', () => {
    let e1 = { id: 1, foo: 'bar'}
    let e2 = { id: 3, foo: 'baz'}
    let e3 = { id: 6, foo: 'bar'}
    db.save(e1, e2, e3)
    expect(db.countWhere((i: any) => i.id % 3 === 0)).toEqual(2)
    expect(db.countWhere((i: any) => i.foo === 'bar')).toEqual(2)
    expect(db.countWhere((i: any) => i.foo === 'baz')).toEqual(1)
  })
  
  it('counts entities with matching properties', () => {
    let e1 = { id: 1, foo: 'bar'}
    let e2 = { id: 3, foo: 'baz'}
    let e3 = { id: 6, foo: 'bar'}
    db.save(e1, e2, e3)
    expect(db.countBy({})).toEqual(3)
    expect(db.countBy({ id: 3 })).toEqual(1)
    expect(db.countBy({ foo: 'bar' })).toEqual(2)
    expect(db.countBy({ id: 6, foo: 'bar' })).toEqual(1)
  })
})