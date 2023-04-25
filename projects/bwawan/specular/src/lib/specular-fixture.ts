import { ComponentFixture } from "@angular/core/testing"

export class SpecularFixture<T> {
  constructor(
    public componentFixture: ComponentFixture<T>
  ) { }

  detectChanges = () =>
    this.componentFixture.detectChanges()
  select = (selector: string) =>
    this.componentFixture.nativeElement.querySelector(selector)
  selectAll = (selector: string) =>
    this.componentFixture.nativeElement.querySelectorAll(selector)
  count = (selector: string) =>
    this.selectAll(selector).length
  shouldSelect = (selector: string) =>
    expect(this.select(selector)).not.toBeNull()
  shouldNotSelect = (selector: string) =>
    expect(this.select(selector)).toBeNull()

  click(selector: string) {
    this.select(selector).click()
    this.detectChanges()
  }

  change(selector: string, value: any) {
    let el = this.select(selector)
    el.value = value
    el.dispatchEvent(new Event('input'))
    this.detectChanges()
  }

  href(selector: string) {
    let hostPrefix = 'http://' + window.location.host
    let href = this.select(selector).href
    return href.startsWith(hostPrefix)
      ? href.substring(hostPrefix.length)
      : href
  }

  text = (selector: string) =>
    this.select(selector).textContent
}
