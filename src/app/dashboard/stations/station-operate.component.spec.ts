import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StationOperateComponent } from './station-operate.component';

describe('StationOperateComponent', () => {
  let component: StationOperateComponent;
  let fixture: ComponentFixture<StationOperateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StationOperateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StationOperateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
