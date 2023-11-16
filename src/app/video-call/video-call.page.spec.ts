import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VideoCallPage } from './video-call.page';

describe('VideoCallPage', () => {
  let component: VideoCallPage;
  let fixture: ComponentFixture<VideoCallPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VideoCallPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
