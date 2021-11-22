import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EEGDataComponent } from './eegdata.component';

describe('EEGDataComponent', () => {
  let component: EEGDataComponent;
  let fixture: ComponentFixture<EEGDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EEGDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EEGDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
