import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StationUpdateComponent } from './station-update.component';

describe('StationUpdateComponent', () => {
  let component: StationUpdateComponent;
  let fixture: ComponentFixture<StationUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StationUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
