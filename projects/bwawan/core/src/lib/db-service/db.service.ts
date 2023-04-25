import { Injectable } from '@angular/core';

function isSuperset(parent: any, child: any) {
  for (var key in child)
    if (parent[key] !== child[key])
      return false
  return true
}

@Injectable({ providedIn: 'root' })
export class DbService {
  private entities: Map<number, Object> = new Map()

  saveAll = (entities: any[]) => this.save(...entities)
  save(...entities: any[]) {
    for(var entity of entities) {
      if (!entity?.id) throw 'missing id'
      this.entities.set(entity.id, entity)
    }
  }

  firstBy = (entity: any) => this.firstWhere((e: any) => isSuperset(e, entity))
  firstWhere(pred: any) {
    for (var entity of this.entities.values())
    if (pred(entity))
    return entity
    return null
  }
  
  countWhere = (pred: any) => {
    let count = 0
    for (var entity of this.entities.values())
    if (pred(entity))
    count++
    return count
  }
  
  all = () => Array.from(this.entities.values())
  get = (id: any) => this.entities.get(id) || null
  delete = (entityOrId: any) => this.entities.delete(entityOrId.id || entityOrId)
  findWhere = (pred: any) => this.all().filter(pred)
  findBy = (entity: any) => this.findWhere((e: any) => isSuperset(e, entity))
  countBy = (entity: any) => this.countWhere((e: any) => isSuperset(e, entity))
}
