import { Component, Input, OnInit } from '@angular/core';

import { InventoryService } from 'src/app/_services/inventory.service';

import { Item } from 'src/app/_interfaces/item';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  @Input() item_list : Item[] = []

  constructor() { }

  ngOnInit(): void {
    //this.item_list = []
  }



}
