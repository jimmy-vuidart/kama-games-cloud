import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerStarterPanelComponent } from './server-starter-panel.component';

describe('ServerStarterPanelComponent', () => {
  let component: ServerStarterPanelComponent;
  let fixture: ComponentFixture<ServerStarterPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServerStarterPanelComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ServerStarterPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
