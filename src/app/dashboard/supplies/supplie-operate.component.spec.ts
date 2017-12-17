import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplieOperateComponent } from './supplie-operate.component';

describe('SupplieOperateComponent', () => {
  let component: SupplieOperateComponent;
  let fixture: ComponentFixture<SupplieOperateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplieOperateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplieOperateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
