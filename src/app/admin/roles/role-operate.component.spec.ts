import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleOperateComponent } from './role-operate.component';

describe('RoleOperateComponent', () => {
  let component: RoleOperateComponent;
  let fixture: ComponentFixture<RoleOperateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleOperateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleOperateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
