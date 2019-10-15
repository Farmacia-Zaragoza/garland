import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgResComponent } from './img-res.component';

describe('ImgResComponent', () => {
  let component: ImgResComponent;
  let fixture: ComponentFixture<ImgResComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgResComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgResComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
