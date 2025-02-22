import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerStatusBadgeComponent } from './server-status-badge.component';

describe('ServerStatusBadgeComponent', () => {
  let component: ServerStatusBadgeComponent;
  let fixture: ComponentFixture<ServerStatusBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServerStatusBadgeComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ServerStatusBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
