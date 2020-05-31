import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CierrasesionComponent } from './cierrasesion.component';

describe('CierrasesionComponent', () => {
  let component: CierrasesionComponent;
  let fixture: ComponentFixture<CierrasesionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CierrasesionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CierrasesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
