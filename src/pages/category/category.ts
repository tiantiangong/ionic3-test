import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';// 引用服务
import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { ProductlistPage } from '../productlist/productlist';

@Component({
  selector: 'page-category',
  templateUrl: 'category.html'
})
export class CategoryPage {
  public ProductlistPage=ProductlistPage;
  public leftCate=[]; /**左侧分类数据 */
  public rightCate=[]; //**右侧分类数据 */
  constructor(public navCtrl: NavController,public config:ConfigProvider,public httpService:HttpServicesProvider) {
    // 左侧的分类数据
    this.getLeftCateData();

  }

  // 获取左侧的数据
  getLeftCateData(){
    var api='api/pcate'
    this.httpService.requestData(api,(data)=>{
      // console.log(data);
      this.leftCate=data.result;
      // 调用右侧的分类
      this.getRightData(this.leftCate[0]['_id']);
    })
  }
  // 获取右边的数据(默认电脑办公的数据)
  getRightData(pid){
    var api='api/pcate?pid='+pid;
    this.httpService.requestData(api,(data)=>{
      this.rightCate=data.result;
    })
  }


}
