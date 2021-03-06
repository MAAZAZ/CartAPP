import { Component, OnInit } from '@angular/core';
import {ProductService} from '../services/product/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CommandLineService} from '../services/commandLine/command-line.service';
import {CartService} from '../services/cart/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  public product:any;
  public commandLine:any={qte:1};
  public card:any;
  public id:string="";

  constructor(private productService : ProductService, private CommandLineService: CommandLineService, private cartService: CartService,
              private route: Router, private routeActive: ActivatedRoute) { }
  ngOnInit(): void {
    this.id=this.routeActive.snapshot.params['id'];
    this.productService.getById(this.id).subscribe(data=>{
      this.product=data;
    });
    this.cartService.getById(1).subscribe(data=>{
      this.card=data;
    })
  }
  save() {
    this.product.id=Number(this.product.id);
    this.commandLine.product="http://localhost:9000/products/"+this.product.id+"/";
    this.commandLine.cart="http://localhost:9000/carts/"+1+"/";
    this.commandLine.pricetotal=this.product.price*this.commandLine.qte
    this.card.pricetotal+=this.commandLine.pricetotal;
    this.cartService.update(1,this.card).subscribe(data=>{
      this.CommandLineService.add(this.commandLine).subscribe(data=>{
        this.route.navigate(['cart']);
      })
    })

  }
}
