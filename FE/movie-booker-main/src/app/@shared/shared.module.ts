import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { DialogModule } from './dialog/dialog.module';

@NgModule({
  imports: [CommonModule, CarouselModule, DialogModule],
  declarations: [LoaderComponent],
  exports: [LoaderComponent, CarouselModule, DialogModule],
})
export class SharedModule {}
