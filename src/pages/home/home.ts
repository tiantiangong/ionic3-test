import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { ConfigProvider } from '../../providers/config/config';// 引用服务
import { HttpServicesProvider } from '../../providers/http-services/http-services';
// 商品详情页面
import { PcontentPage } from '../pcontent/pcontent';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // 商品详情
  public PcontentPage=PcontentPage;
  // 精品推荐数组
  public bestList=[];
  public bestListWidth='';
  // 猜你喜欢
  public hotList=[];
  /**轮播图数组 */
  public focusList=[];
  constructor(public navCtrl: NavController,public config:ConfigProvider,public httpService:HttpServicesProvider) {// 实例化
    // console.log(this.config);
    // alert(this.config.apiUrl);
    // this.config.run();
    this.getFocus(); //调用轮播图方法
    this.getBestProduct();// 调用精品推荐方法
    this.getHotProduct(); //调用猜你喜欢方法

    // 设置滚动展示的长度
    // this.recListWidth=this.recList.length*90+'px';
  }

  // 定义一个跳转到搜索页面的方法
  goSearch(){
    this.navCtrl.push(SearchPage);
  }

  // 轮播图
  getFocus(){
    var that=this;
    this.httpService.requestData('api/focus',function(data){
      // console.log(data);
      that.focusList=data.result;
    })
  }

  // 精品推荐
  getBestProduct(){
    // http://39.108.159.135/api/plist?is_best=1
    // var that=this;
    this.httpService.requestData('api/plist?is_best=1',(data)=>{
      // console.log(data);
      this.bestList=data.result;
      this.bestListWidth=this.bestList.length*90+'px';
    })
  }

  //猜你喜欢
  getHotProduct(){
    // http://39.108.159.135/api/plist?is_hot=1
    this.httpService.requestData('api/plist?is_hot=1',(data)=>{
      // console.log(data);
      this.hotList=data.result;
    })
  }
}
