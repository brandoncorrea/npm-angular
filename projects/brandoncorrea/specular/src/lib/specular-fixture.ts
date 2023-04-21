import { ComponentFixture } from "@angular/core/testing"

export class SpecularFixture<T> {
  constructor(private fixture: ComponentFixture<T>) {}
  detectChanges = () =>
    this.fixture.detectChanges()
  select = (selector: string) =>
    this.fixture.nativeElement.querySelector(selector)
  shouldSelect = (selector: string) =>
    expect(this.select(selector)).not.toBeNull()
  shouldNotSelect = (selector: string) =>
    expect(this.select(selector)).toBeNull()
  click = (selector: string) =>
    this.select(selector).click()
  text = (selector: string) =>
    this.select(selector).textContent
}
