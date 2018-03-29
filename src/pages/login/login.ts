import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';// 引用服务
import { HttpServicesProvider } from '../../providers/http-services/http-services';
// localStorage服务
import { StorageProvider } from '../../providers/storage/storage';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  // 定义数据
  public userinfo={
    username:'',
    password:''
  }
  constructor(public navCtrl: NavController,public alertCtrl:AlertController, public navParams: NavParams,public config:ConfigProvider,public httpService:HttpServicesProvider,public storage:StorageProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  // 登录
  doLogin(){
    // this.userinfo, 获取表单信息
    // 请求接口，完成登录
    if(this.userinfo.username.length<6){
      let alert = this.alertCtrl.create({
        title: '啊哦~ (＞人＜；)',
        subTitle: '您输入的用户名格式有误!',
        buttons: ['好的']
      });
      alert.present();
    }else{
      var api='api/doLogin';
      this.httpService.doPost(api,this.userinfo,(data)=>{
        // console.log(data);
        if(data.success){
          // alert('登陆成功')
          this.storage.set('userinfo',data.userinfo[0]);
          this.navCtrl.popToRoot(); // 跳转到根页面
        }else{
          // alert(data.message);
          let alert = this.alertCtrl.create({
            title: '啊哦~ (＞人＜；)',
            subTitle: data.message,
            buttons: ['好的']
          });
          alert.present();
        }
      })
    }

  }
}
