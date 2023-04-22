import { ComponentFixture } from "@angular/core/testing"

export class SpecularFixture<T> {
  constructor(
    public componentFixture: ComponentFixture<T>
  ) { }

  detectChanges = () =>
    this.componentFixture.detectChanges()
  select = (selector: string) =>
    this.componentFixture.nativeElement.querySelector(selector)
  shouldSelect = (selector: string) =>
    expect(this.select(selector)).not.toBeNull()
  shouldNotSelect = (selector: string) =>
    expect(this.select(selector)).toBeNull()

  click(selector: string) {
    this.select(selector).click()
    this.detectChanges()
  }

  text = (selector: string) =>
    this.select(selector).textContent
}
