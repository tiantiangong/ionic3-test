import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
// 组件
import { ComponentsModule} from '../components/components.module';
import { MyComponent } from '../components/my/my';
// 自定义页面
import { CartPage } from '../pages/cart/cart';
import { CategoryPage } from '../pages/category/category';
import { UserPage } from '../pages/user/user';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { PcontentPage } from '../pages/pcontent/pcontent';
import { PersonalPage } from '../pages/personal/personal';
import { OrderPage } from '../pages/order/order';
import { AddaddressPage } from '../pages/addaddress/addaddress';
import { EditaddressPage } from '../pages/editaddress/editaddress';
import { AddressPage } from '../pages/address/address';

import { PaymentPage } from '../pages/payment/payment';
// 注册
import { RegisterPage } from '../pages/register/register';
import { RegistersignPage } from '../pages/registersign/registersign';
import { RegisterpasswordPage } from '../pages/registerpassword/registerpassword';
// 搜索
import { SearchPage } from '../pages/search/search';
// 商品列表
import { ProductlistPage } from '../pages/productlist/productlist';
import { TestPage } from '../pages/test/test';


import { HttpModule,JsonpModule } from '@angular/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ConfigProvider } from '../providers/config/config';
import { HttpServicesProvider } from '../providers/http-services/http-services';
import { StorageProvider } from '../providers/storage/storage';
import { ToolsProvider } from '../providers/tools/tools';

@NgModule({
  declarations: [
    MyApp,
    CartPage,
    CategoryPage,
    HomePage,
    TabsPage,
    UserPage,
    LoginPage,
    RegisterPage,
    RegistersignPage,
    RegisterpasswordPage,
    SearchPage,
    ProductlistPage,
    PcontentPage,
    PersonalPage,
    OrderPage,
    AddressPage,
    PaymentPage,
    EditaddressPage,
    AddaddressPage,
    TestPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    ComponentsModule,
    // IonicModule.forRoot(MyApp)
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages:'true',
      backButtonText:''
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CartPage,
    CategoryPage,
    HomePage,
    TabsPage,
    UserPage,
    LoginPage,
    RegisterPage,
    RegistersignPage,
    RegisterpasswordPage,
    SearchPage,
    ProductlistPage,
    PcontentPage,
    PersonalPage,
    OrderPage,
    AddressPage,
    PaymentPage,
    EditaddressPage,
    AddaddressPage,
    TestPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConfigProvider,
    HttpServicesProvider,
    StorageProvider,
    ToolsProvider
  ]
})
export class AppModule {}
