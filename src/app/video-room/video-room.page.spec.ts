import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { VideoRoomPage } from './video-room.page';

describe('VideoRoomPage', () => {
  let component: VideoRoomPage;
  let fixture: ComponentFixture<VideoRoomPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VideoRoomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
