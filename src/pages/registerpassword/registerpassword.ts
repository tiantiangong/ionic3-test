import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';// 引用服务
import { HttpServicesProvider } from '../../providers/http-services/http-services';
// localStorage服务
import { StorageProvider } from '../../providers/storage/storage';
/**
 * Generated class for the RegisterpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registerpassword',
  templateUrl: 'registerpassword.html',
})
export class RegisterpasswordPage {
  public tel='';
  public code='';
  public password='';
  public rpassword='';

  constructor(public navCtrl: NavController, public navParams: NavParams,public config:ConfigProvider,public httpService:HttpServicesProvider,public storage:StorageProvider) {
    this.tel=storage.get('reg_tel'); // 获取到localStorage的电话号码
    this.code=storage.get('reg_code');// 获取到localStorage的验证码
    console.log('电话号码为:'+this.tel+"验证码为:"+this.code);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterpasswordPage');
  }
  // 执行完成注册
  doRegister(){
    if(this.password!=this.rpassword){
      alert("两次密码不相同!")
    }else if(this.password.length<6){
      alert('密码长度不能小于6位');
    }
    else{
      // 提交数据
    var api='api/register';
    this.httpService.doPost(api,{'tel':this.tel,'code':this.code,'password':this.password},(result)=>{
      console.log(result);
      if(result.success){
        // 保存用户信息
        this.storage.set('userinfo',result.userinfo[0]);
        // 返回到用户中心，表示注册成功
        this.navCtrl.popToRoot();
        
      }
    })


    }
  }

}
