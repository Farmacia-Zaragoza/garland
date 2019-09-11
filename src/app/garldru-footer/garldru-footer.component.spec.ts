import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GarldruFooterComponent } from './garldru-footer.component';

describe('GarldruFooterComponent', () => {
  let component: GarldruFooterComponent;
  let fixture: ComponentFixture<GarldruFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GarldruFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GarldruFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
