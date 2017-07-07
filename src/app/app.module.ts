import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ConsoleCharComponent } from './console-char/console-char.component';
import { FontGeneratorService } from './services/font-generator.service';
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
import { TextExportComponent } from './exporters/text-export/text-export.component';
import {FontProviderService} from './services/font-provider.service';
import {CssInjectorService} from './console-char/css-injector.service';
import {ControlsService} from './services/controls.service';
import { PixelDrawCursorComponent } from './modes/pixeldraw/pixel-draw-cursor/pixel-draw-cursor.component';
import {PixelDrawCursorService} from "./modes/pixeldraw/pixel-draw-cursor.service";
import {PixelDrawModeService} from "./modes/pixeldraw/pixel-draw-mode.service";
import {DrawingsStorageService} from "./services/drawings-storage.service";

@NgModule({
  declarations: [
    AppComponent,
    ConsoleCharComponent,
    ConsoleDisplayComponent,
    CursorComponent,
    ModesManagerComponent,
    ColorChangerComponent,
    TextExportComponent,
    PixelDrawCursorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    FontGeneratorService,
    ConsoleDataService,
    CursorService,
    NormalDrawService,
    ColorChangeService,
    ScrollService,
    ModesManagerService,
    BoxDrawService,
    TextService,
    ModeSwitcherService,
    ModesStatusProviderService,
    FontProviderService,
    CssInjectorService,
    ControlsService,
    PixelDrawCursorService,
    PixelDrawModeService,
    DrawingsStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
