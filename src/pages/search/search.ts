import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Content,AlertController } from 'ionic-angular';
// 服务
import { ConfigProvider } from '../../providers/config/config';// 引用服务
import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { StorageProvider } from '../../providers/storage/storage';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  // 装饰器
  @ViewChild(Content) content:Content;// this.content.scrollToTop();回到顶部
  public page=1;
  public flag=false;// 有没有关键词 开关
  public keywords=''; // 关键字
  public list=[];  // 模拟商品数据
  public hasData=true;  /**是否有数据 */
  public historyList=[];// 历史记录
  constructor(public navCtrl: NavController, public navParams: NavParams,public config:ConfigProvider,public httpService:HttpServicesProvider,public storage:StorageProvider,public alertCtrl:AlertController) {
    // 获取历史记录
    this.getHistory();
    
  }

  ionViewDidLoad(infiniteScroll) {
    console.log('ionViewDidLoad SearchPage');
  }
  // 获取搜索的列表
  getSearchList(infiniteScroll){
    // alert(this.keywords);
    if(!infiniteScroll){ // 点击搜索按钮
      this.page=1;
      this.hasData=true;
      this.content.scrollToTop(0); // 每次搜索结果回到顶部
      this.saveHistory(); // 保存历史记录的方法
    }
    var api='api/plist?search='+this.keywords+'&page='+this.page;
    this.httpService.requestData(api,(data)=>{
      // console.log(data);
      if(this.page==1){ /**第一页替换数据 */
        this.list=data.result;
        if(infiniteScroll){
          infiniteScroll.enable(true);/**如果切换关键词让上拉更新可用 */
        }
      }else{
        this.list=this.list.concat(data.result);        /**拼接数据 */
      }
      
      this.flag=true;// 显示商品列表

      if(infiniteScroll){
        // 告诉ionic请求数据完成
       infiniteScroll.complete();
        if(data.result<10){
          this.hasData=false;
        }
       };
       this.page++;
    })
  }

    // 上拉加载更多方法
    doloadMore(infiniteScroll){
      this.getSearchList(infiniteScroll);
    }

    // 保存历史记录
    saveHistory(){
      // 1.获取历史记录
      var history=this.storage.get('historyData');
      // 2.判断历史记录里面有没有搜索的数据
      if(history){
        if(history.indexOf(this.keywords)!=-1){

        }else{/**没有数据 */
          history.push(this.keywords);
          // 重新写入
          this.storage.set('historyData',history);
        }
      }else{
        this.historyList.push(this.keywords);
      // 3.没有就拼接数据，重新写入到localStorage
      this.storage.set('historyData',this.historyList);
      }
   
    }
    // 获取历史记录
    getHistory(){
      var history=this.storage.get('historyData');
      if(history){ /**如果历史纪录存在， 把历史记录给数据 */
        this.historyList=history; 
       
      }
    }
    // 删除历史数据
    removeHistory(keywords){
      // 删除历史记录提醒
      let confirm = this.alertCtrl.create({
        title: '确定要删除吗?',
        message: '确定要删除这条历史记录吗，确定点击时，否则点击否?',
        buttons: [
          {
            text: '否',
            handler: () => {
              console.log('Disagree clicked');
            }
          },
          {
            text: '是',
            handler: () => {
              // console.log('Agree clicked');
              var index=this.historyList.indexOf(keywords);
              // console.log(index);
              this.historyList.splice(index,1);
              this.storage.set('historyData',this.historyList);    
            }
          }
        ]
      });
      confirm.present();
    }
    // 点击历史记录执行的方法
    goSearch(keywords){
      // console.log(keywords);
      this.keywords=keywords;
      this.getSearchList('');
    }

}
