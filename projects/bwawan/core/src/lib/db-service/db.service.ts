import { Injectable } from '@angular/core';

function isSuperset(parent: any, child: any) {
  for (var key in child)
    if (parent[key] !== child[key])
      return false
  return true
}

const id = (entityOrId: any) => entityOrId?.id || entityOrId

@Injectable({ providedIn: 'root' })
export class DbService {
  private entities: Map<number, Object> = new Map()

  saveAll = (entities: any[]): void => this.save(...entities)
  save = (...entities: any[]) =>
    entities.forEach(entity => {
      if (!entity?.id) throw 'missing id'
      this.entities.set(entity.id, entity)
    })

  firstBy = (entity: any): any => this.firstWhere((e: any) => isSuperset(e, entity))
  firstWhere(pred: any): any {
    for (var entity of this.entities.values())
      if (pred(entity))
        return entity
    return null
  }
  
  countWhere = (pred: any): number => {
    let count = 0
    for (var entity of this.entities.values())
      if (pred(entity))
        count++
    return count
  }
  
  all = (): any[] => Array.from(this.entities.values())
  get = (entityOrId: any): any => this.entities.get(id(entityOrId)) || null
  delete = (...entities: any[]) =>
    entities.forEach(entityOrId => this.entities.delete(id(entityOrId)))
  clear = () => this.entities.clear()
  findWhere = (pred: any): any[] => this.all().filter(pred)
  findBy = (entity: any): any[] => this.findWhere((e: any) => isSuperset(e, entity))
  countBy = (entity: any): number => this.countWhere((e: any) => isSuperset(e, entity))
}
