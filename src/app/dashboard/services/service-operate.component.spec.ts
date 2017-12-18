import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceOperateComponent } from './service-operate.component';

describe('ServiceOperateComponent', () => {
  let component: ServiceOperateComponent;
  let fixture: ComponentFixture<ServiceOperateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceOperateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceOperateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
