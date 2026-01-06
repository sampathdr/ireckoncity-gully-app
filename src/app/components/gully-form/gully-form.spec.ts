import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GullyForm } from './gully-form';

describe('GullyForm', () => {
  let component: GullyForm;
  let fixture: ComponentFixture<GullyForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GullyForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GullyForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
