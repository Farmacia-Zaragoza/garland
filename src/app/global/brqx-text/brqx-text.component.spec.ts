import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrqxTextComponent } from './brqx-text.component';

describe('BrqxTextComponent', () => {
  let component: BrqxTextComponent;
  let fixture: ComponentFixture<BrqxTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrqxTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrqxTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
