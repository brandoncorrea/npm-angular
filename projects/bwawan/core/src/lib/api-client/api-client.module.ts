import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ApiClient } from "./api-client";

@NgModule({
  imports: [HttpClientModule],
  providers: [ApiClient]
})
export class ApiClientModule { }
