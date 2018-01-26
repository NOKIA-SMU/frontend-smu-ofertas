import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileOperateComponent } from './profile-operate.component';

describe('ProfileOperateComponent', () => {
  let component: ProfileOperateComponent;
  let fixture: ComponentFixture<ProfileOperateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileOperateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileOperateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
