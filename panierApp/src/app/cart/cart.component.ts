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
  public products:Map<Object, number>=new Map();

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

  deleteCommand(productName: any){
    this.commandLines._embedded.commandLines.forEach((command: any)=>{
      let commandLine:any= command;
      this.productService.getByUrl(commandLine._links.product.href).subscribe(product=>{
        let productItem:any=product;
        if(productItem.name==productName) {
          // @ts-ignore
          this.cart.pricetotal = this.cart.pricetotal - productItem.price*this.products.get(productName);
              this.cartService.update(1, this.cart).subscribe(data=>{});
              this.commandLineService.delete(commandLine.id).subscribe(data=>{
                window.location.reload()
              })
        }
      })
    })
  }

}
