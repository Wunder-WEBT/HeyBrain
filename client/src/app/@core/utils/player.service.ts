import { Injectable } from '@angular/core';

export class Track {
  name: string;
  artist: string;
  url: string;
  cover: string;
}

@Injectable()
export class PlayerService {
  current: number;
  playlist: Track[] = [
    {
      name: 'Stress Relief',
      artist: 'Calm Music Guru',
      url: 'assets/music/stressrelief.mp3',
      cover: 'assets/images/cover1.jpg',
    },
    {
      name: 'Stress Relief 2',
      artist: 'Symphonic Distribution',
      url: 'assets/music/stressrelief2.mp3',
      cover: 'assets/images/cover2.jpg',
    },
    {
      name: 'Stress Relief 3',
      artist: 'Mojang',
      url: 'assets/music/stressrelief3.mp3',
      cover: 'assets/images/cover3.jpg',
    },
  ];

  random(): Track {
    this.current = Math.floor(Math.random() * this.playlist.length);
    return this.playlist[this.current];
  }

  next(): Track {
    return this.getNextTrack();
  }

  prev() {
    return this.getPrevTrack();
  }

  private getNextTrack(): Track {
    if (this.current === this.playlist.length - 1) {
      this.current = 0;
    } else {
      this.current++;
    }

    return this.playlist[this.current];
  }

  private getPrevTrack(): Track {
    if (this.current === 0) {
      this.current = this.playlist.length - 1;
    } else {
      this.current--;
    }

    return this.playlist[this.current];
  }
}
