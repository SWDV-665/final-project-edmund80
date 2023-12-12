import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, AlertController } from '@ionic/angular';
import { PillsServiceService } from '../pills-service.service';
import { InputDialogServiceService } from '../input-dialog-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  title = "Medication List";
  items: any = []

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public dataService: PillsServiceService,
    public inputDialogService: InputDialogServiceService
  ) { }

  ngOnInit() {
    // Assuming your service returns an observable of items
    this.items= this.dataService.getItems();
  }

}

