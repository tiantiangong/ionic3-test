import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegistersignPage } from '../registersign/registersign';
import { ConfigProvider } from '../../providers/config/config';// 引用服务
import { HttpServicesProvider } from '../../providers/http-services/http-services';
// localStorage服务
import { StorageProvider } from '../../providers/storage/storage';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  // public RegistersignPage=RegistersignPage;
  public tel=''; //电话
  constructor(public navCtrl: NavController,public alertCtrl:AlertController, public navParams: NavParams,public config:ConfigProvider,public httpService:HttpServicesProvider,public storage:StorageProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  // 跳转到发送验证码
  goRegistersignPage(){
    // alert(this.tel);
    // 验证电话号码是否合法
    // if(/^\d/{11}$/.test(this.tel)){ }
    var api='api/sendCode';
    this.httpService.doPost(api,{'tel':this.tel},(result)=>{
      console.log("第一个页面传递的验证码:"+result.code); // 发送的验证码返回到控制台， 方便验证
      if(result.success){
        this.storage.set('reg_tel',this.tel); // 保存电话号码到localStorage
        this.navCtrl.push(RegistersignPage); //跳转到下个页面 验证码页面
      }else{
        // alert('发送验证码失败,'+result.message);
        let alert = this.alertCtrl.create({
          title: '啊哦~ (＞人＜；)',
          subTitle: '发送验证码失败:'+result.message,
          buttons: ['好的']
        });
        alert.present();
      }
    })

  }
}
