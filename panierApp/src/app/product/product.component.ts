import { Component, OnInit } from '@angular/core';
import {ProductService} from '../services/product/product.service';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public products:any=new Array();

  constructor(private productService : ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts(){
    this.productService.getAll().subscribe(data=>{
      this.products=data;
    })
  }

}
