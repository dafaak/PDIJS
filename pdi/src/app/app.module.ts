import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainComponent} from './componentes/main/main.component';
import {MainModule} from "./componentes/main/main.module";
import {NgbAlertModule, NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {VentanaModule} from './componentes/main/formularios/ventana/ventana.module';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainModule,
    VentanaModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
