import { NgModule } from '@angular/core';
import { ContentMessageComponent } from './content-message.component';

@NgModule({
  declarations: [
    ContentMessageComponent,
  ],
  exports: [
    ContentMessageComponent,
  ]
})
export class ContentMessageModule { }
