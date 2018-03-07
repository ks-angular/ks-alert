import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendAlertComponent } from './extend-alert.component';

describe('ExtendAlertComponent', () => {
  let component: ExtendAlertComponent;
  let fixture: ComponentFixture<ExtendAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
