import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleCharComponent } from './console-char.component';

describe('ConsoleCharComponent', () => {
  let component: ConsoleCharComponent;
  let fixture: ComponentFixture<ConsoleCharComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsoleCharComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsoleCharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
