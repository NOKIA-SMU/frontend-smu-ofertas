import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionOperateComponent } from './permission-operate.component';

describe('PermissionOperateComponent', () => {
  let component: PermissionOperateComponent;
  let fixture: ComponentFixture<PermissionOperateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionOperateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionOperateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
