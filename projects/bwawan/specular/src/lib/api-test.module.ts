import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NgModule } from "@angular/core"
import { ApiClientModule } from '@bwawan/core'

@NgModule({
  imports: [
    HttpClientTestingModule,
    ApiClientModule
  ],
  providers: [{provide: 'BASE_URL', useValue: 'BASE_URL/'}]
})
export class ApiTestModule { }
