import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColleaguesComponent } from './colleagues.component';
import { TranslateModule } from '@ngx-translate/core';

describe('ColleaguesComponent', () => {
  let component: ColleaguesComponent;
  let fixture: ComponentFixture<ColleaguesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColleaguesComponent, TranslateModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ColleaguesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize colleagues signal', () => {
    expect(component.colleagues().length).toBeGreaterThan(0);
  });
});
