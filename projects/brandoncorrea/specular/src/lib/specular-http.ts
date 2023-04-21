import { HttpTestingController } from "@angular/common/http/testing";
import { Specular } from "./specular";

export class SpecularHttp {
  private static controller: HttpTestingController;

  static inject() {
    SpecularHttp.controller = Specular.inject(HttpTestingController)
  }

  static verify() {
    SpecularHttp.controller.verify()
  }

  static expectOne(method: string, url: string) {
    let req = SpecularHttp.controller.expectOne(url)
    expect(req.request.method).toBe(method)
    return req
  }
}
