import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferOperateComponent } from './offer-operate.component';

describe('OfferOperateComponent', () => {
  let component: OfferOperateComponent;
  let fixture: ComponentFixture<OfferOperateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferOperateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferOperateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
