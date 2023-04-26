import { HttpTestingController } from "@angular/common/http/testing";
import { Specular } from "./specular";

const conformUrl = (url: string) =>
  /^localhost:\d+|https:\/\/|http:\/\//.test(url)
    ? url
    : 'BASE_URL/' + url

export class SpecularHttp {
  public static controller: HttpTestingController;

  static inject = () => SpecularHttp.controller = Specular.inject(HttpTestingController)
  static verify = () => SpecularHttp.controller.verify()
  static expectOne(method: string, url: string, body?: any) {
    let req = SpecularHttp.controller.expectOne(conformUrl(url))
    expect(req.request.method).toBe(method)
    if (body) expect(req.request.body).toEqual(body)
    return req
  }

  static expectNone = (url: string) => SpecularHttp.controller.expectNone(url)

  static expectError = (
    method: string,
    url: string,
    body?: any,
    opts: {
      headers?: any
      status: number,
      statusText: string
    } = { 
      status: 400,
      statusText: ''
    }) =>
    SpecularHttp
    .expectOne(method, url)
    .flush(body, opts)
}
