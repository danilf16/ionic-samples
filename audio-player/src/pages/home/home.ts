import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Media, MediaObject } from "@ionic-native/media";
import { BackgroundMode } from '@ionic-native/background-mode';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    private media: Media,
    private backgroundMode: BackgroundMode,
    private localNotifications: LocalNotifications
  ) {

  }

  ngOnInit() {
    console.log("On init");

    if (this.platform.is("cordova")) {
      console.log("this is cordova");
      this.platform.ready().then(() => { this.initPlayer(); });
      // this.initPlayer();
    } else {
      console.log("this is not cordova");
    }
  }

  initPlayer() {
    this.backgroundMode.enable();

    const file: MediaObject = this.media.create('assets/audio/bensound-summer.mp3');

    // to listen to plugin events:

    file.onStatusUpdate.subscribe(status => console.log(status)); // fires when file status changes
    file.onSuccess.subscribe(() => console.log('Action is successful'));
    file.onError.subscribe(error => console.log('Error!', error));

    // play the file
    file.play();
  }

  async showNotification() {
    let hasPermissions: boolean = await this.localNotifications.hasPermissions();
    if (!hasPermissions) {
      this.localNotifications.requestPermission();
    } else {
      this.localNotifications.schedule({
        title: "Test local notification",
        text: "Some text in local notification",
        sticky: true /* Android only */
      });
    }
  }

}
