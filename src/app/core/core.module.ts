import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandlerModule } from './errors/error-handler.module';
//import { NotificationModule } from '../shared/notification/notification.module';
import { StorageModule } from '../shared/storage/storage.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AsideComponent } from './components/aside/aside.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AsideComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    AsideComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ErrorHandlerModule,
    StorageModule,
    ////NotificationModule
  ]
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() parentModule: CoreModule
  ) {

    if (parentModule) {
      throw new Error('CoreModule já foi instanciado. Importe-o somente em AppModule.');
    }
  }
}
