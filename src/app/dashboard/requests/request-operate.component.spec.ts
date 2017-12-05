import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestOperateComponent } from './request-operate.component';

describe('RequestOperateComponent', () => {
  let component: RequestOperateComponent;
  let fixture: ComponentFixture<RequestOperateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestOperateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestOperateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
