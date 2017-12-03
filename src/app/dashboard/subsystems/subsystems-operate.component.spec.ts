import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsystemOperateComponent } from './subsystem-operate.component';

describe('SubsystemOperateComponent', () => {
  let component: SubsystemOperateComponent;
  let fixture: ComponentFixture<SubsystemOperateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubsystemOperateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubsystemOperateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
