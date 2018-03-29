import { Component } from '@angular/core';

/**
 * Generated class for the MyComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'my',
  templateUrl: 'my.html'
})
export class MyComponent {

  text: string;

  constructor() {
    console.log('Hello MyComponent Component');
    this.text = 'Hello World';
  }

}
