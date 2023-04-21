import { TestBed, TestModuleMetadata } from "@angular/core/testing";
import { Type } from "@angular/core";
import { SpecularFixture } from "./specular-fixture";

export class Specular {
  static inject = TestBed.inject
  
  static configureTestingModule(moduleDef: TestModuleMetadata): TestBed {
    return TestBed.configureTestingModule(moduleDef)
  }

  static createComponent<T>(component: Type<T>) : SpecularFixture<T> {
    let fixture = new SpecularFixture<T>(TestBed.createComponent(component))
    fixture.detectChanges()
    return fixture;
  }
}
