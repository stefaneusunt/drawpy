import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ConsoleCharComponent } from './console-char/console-char.component';
import { FontService } from './services/font.service';
import { ConsoleDisplayComponent } from './console-display/console-display.component';
import { CursorComponent } from './cursor/cursor.component';
import { ConsoleDataService } from './console-display/console-data.service';
import { CursorService } from './cursor/cursor.service';
import { ModesManagerComponent } from './modes-manager/modes-manager.component';
import { NormalDrawService } from './modes/normal-draw.service';
import { ColorChangeService } from './modes/color-change.service';

@NgModule({
  declarations: [
    AppComponent,
    ConsoleCharComponent,
    ConsoleDisplayComponent,
    CursorComponent,
    ModesManagerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    FontService,
    ConsoleDataService,
    CursorService,
    NormalDrawService,
    ColorChangeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
