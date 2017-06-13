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
import { ColorChangeService } from './color-changer/color-change.service';
import { ColorChangerComponent } from './color-changer/color-changer.component';
import { ScrollService } from './modes/scroll.service';
import { ModesManagerService } from './modes-manager/modes-manager.service';
import { BoxDrawService } from './modes/box-draw.service';
import { TextService } from './modes/text.service';
import { ModeSwitcherService } from './modes-manager/mode-switcher.service';
import { ModesStatusProviderService } from './modes-manager/modes-status-provider.service';

@NgModule({
  declarations: [
    AppComponent,
    ConsoleCharComponent,
    ConsoleDisplayComponent,
    CursorComponent,
    ModesManagerComponent,
    ColorChangerComponent
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
    ColorChangeService,
    ScrollService,
    ModesManagerService,
    BoxDrawService,
    TextService,
    ModeSwitcherService,
    ModesStatusProviderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
