// input-dialog-service.service.ts

import { Injectable } from '@angular/core';
import { PillsServiceService } from './pills-service.service';
import { AlertController } from '@ionic/angular';

@Injectable()
export class InputDialogServiceService {

  constructor(public dataService: PillsServiceService, public alertCtrl: AlertController) {
    console.log('Hello InputDialogService');
  }

  async showPrompt(item?: { name: string; quantity: any; }, id?: any) {  
    const prompt = await this.alertCtrl.create({
      header: item ? 'Edit Item' : 'Add Item',
      message: 'Please add or edit an item....',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: item ? item.name : null
        },
        {
          name: 'quantity',
          placeholder: 'Quantity',
          value: item ? item.quantity : null
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel Clicked');
          }
        },
        {
          text: 'Save',
          handler: (editedItem) => {
            console.log('Saved Clicked', editedItem);
            if (id !== undefined) { 
              // If id is defined, it means we are editing an existing item
              this.dataService.editItem({ ...editedItem, _id: id });
            } else {
              // If id is not defined then add new item
              this.dataService.addItem(editedItem);
            }
          }
        },
      ]
    });
    prompt.present(); 
  }

  getItemsLength(): number {
    return this.dataService.items.length;
  }
}



