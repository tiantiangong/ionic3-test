import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// localStorage服务
import { StorageProvider } from '../../providers/storage/storage';
/**
 * Generated class for the PersonalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-personal',
  templateUrl: 'personal.html',
})
export class PersonalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:StorageProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonalPage');
  }
  // 退出登录
  doLoginOut(){
    // 清空登录
    this.storage.remove('userinfo');
    // 跳转到用户中心
    this.navCtrl.popToRoot();
  }
}
