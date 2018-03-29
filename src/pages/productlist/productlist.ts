import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// 服务
import { ConfigProvider } from '../../providers/config/config';// 引用服务
import { HttpServicesProvider } from '../../providers/http-services/http-services';
/**
 * Generated class for the ProductlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-productlist',
  templateUrl: 'productlist.html',
})
export class ProductlistPage {
  public list=[];
  public cid=''; /**获取分类id */
  public page=1;// 分页
  constructor(public navCtrl: NavController, public navParams: NavParams,public config:ConfigProvider,public httpService:HttpServicesProvider) {


    //获取传值
  //  console.log( this.navParams.get('cid'));
  this.cid=this.navParams.get('cid');
  //  调用获取数据方法
    this.getProductList('');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductlistPage');
  }

  // 获取对应的分类数据列表
  getProductList(infiniteScroll){
    var api='api/plist?cid='+this.cid+'&page='+this.page;
    this.httpService.requestData(api,(data)=>{
      // console.log("获得的数据"+data);
      this.list=this.list.concat(data.result); /**数据拼接 */
      if(infiniteScroll){
       // 告诉ionic请求数据完成
      infiniteScroll.complete();
      if(data.result.length<10){ /**没有数据停止上拉更新 */
        infiniteScroll.enable(false);
      }
      };
      this.page++;
  
    })

  }

  // 上拉加载更多方法
  doloadMore(infiniteScroll){
    this.getProductList(infiniteScroll);
  }

}
