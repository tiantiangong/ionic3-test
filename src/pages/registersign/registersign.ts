import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterpasswordPage } from '../registerpassword/registerpassword';

import { ConfigProvider } from '../../providers/config/config';// 引用服务
import { HttpServicesProvider } from '../../providers/http-services/http-services';
// localStorage服务
import { StorageProvider } from '../../providers/storage/storage';
/**
 * Generated class for the RegistersignPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registersign',
  templateUrl: 'registersign.html',
})
export class RegistersignPage {
  public tel=''; // 提交过来的手机号码
  public code=[];// 验证码
  public num=10;// 倒计时的数量
  public isShowSend=false; // 是否显示发送验证码的按钮
  constructor(public navCtrl: NavController, public navParams: NavParams,public config:ConfigProvider,public httpService:HttpServicesProvider,public storage:StorageProvider) {
    this.doTimer();
    // 手机号
    this.tel=this.storage.get('reg_tel');
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad RegistersignPage');
  }
  goRegisterpasswordPage(){
    // this.navCtrl.push(RegisterpasswordPage);
    // 验证 验证码是否匹配成功
    var api='api/validateCode';
    this.httpService.doPost(api,{'tel':this.tel,'code':this.code},(result)=>{
      if(result.success){
        // 保存验证码
        this.storage.set('reg_code',this.code);
        // 跳转到下一个输入密码页面
        this.navCtrl.push(RegisterpasswordPage);
      }else{
        alert('验证码输入有误');

      }
    })

  }

  // 发送验证码
  sendCode(){
    // console.log('重新发送验证码');
    // 获取电话号码    
    var api='api/sendCode';
    this.httpService.doPost(api,{'tel':this.tel},(result)=>{
      console.log('你的验证码为:'+result.code); // 发送的验证码返回到控制台， 方便验证
      if(result.success){
        // 调用倒计时
        this.doTimer(); // 执行倒计时方法
        this.num=10; // 重置时间
        this.isShowSend=false; // 显示倒计时
      }else{
        alert('err...');
      }
    })
  }
  // 倒计时的方法
  doTimer(){
   var timer=setInterval(()=>{
    --this.num;
    if(this.num==0){
      clearInterval(timer);
      this.isShowSend=true;
    }
    },1000)
  }
}
