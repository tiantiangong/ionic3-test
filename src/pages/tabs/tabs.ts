import { Component } from '@angular/core';

import { CartPage } from '../cart/cart';
import { CategoryPage } from '../category/category';
import { HomePage } from '../home/home';
import { UserPage } from '../user/user';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage; //主页
  tab2Root = CategoryPage;  //分类页面 
  tab3Root = CartPage; // 购物车页面
  tab4Root = UserPage; // 我的页面

  constructor() {

  }
}
