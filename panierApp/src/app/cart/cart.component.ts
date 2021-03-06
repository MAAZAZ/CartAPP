import { Component, OnInit } from '@angular/core';
import {CartService} from '../services/cart/cart.service';
import {ProductService} from '../services/product/product.service';
import {CommandLineService} from '../services/commandLine/command-line.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public cart:any;
  public commandLines:any;
  public products:Map<any, any>=new Map();

  constructor(private productService : ProductService, private commandLineService: CommandLineService, private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getById(1).subscribe(data=>{
      this.cart=data
      this.commandLineService.getByUrl(this.cart._links.commandLineList.href).subscribe(data=>{
        this.commandLines=data
        this.commandLines._embedded.commandLines.forEach((command: any )=>{
           this.productService.getByUrl(command._links.product.href).subscribe(product=>{
             let prod:any=product;
             if(this.products.has(prod.name))
               this.products.set(prod.name,this.products.get(prod.name)+command.qte)
             else
             this.products.set(prod.name,command.qte)
           })
         })
      })
    })
  }

  someFunction(arr: any[]){
    return arr.map(o => o.property);
  }

}
