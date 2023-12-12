import { Component } from '@angular/core';
import { NavController, ToastController, AlertController } from '@ionic/angular';
import { PillsServiceService } from '../pills-service.service';
import { InputDialogServiceService } from '../input-dialog-service.service';
import { Subscription } from 'rxjs';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  title = "Pills";
  items: any = [];
  errorMessage: string = '';
  itemsSubscription!: Subscription;
  http: any;

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public dataService: PillsServiceService,
    public inputDialogService: InputDialogServiceService,
    private camera: Camera
  ) {}

  ngOnInit() {
    this.loadItems();
  }

  ngOnDestroy() {
    if (this.itemsSubscription) {
      this.itemsSubscription.unsubscribe();
    }
  }

  loadItems() {
    this.itemsSubscription = this.dataService.getItems().subscribe(
      items => this.items = items,
      error => this.errorMessage = <any>error
    );
  }

  removeItem(id: string) {
    this.dataService.removeItem(id);
  }

  async editItem(item: { name: string; quantity: any }, id: string) {
    console.log("Editing Item -", item, id);
    this.editItemPrompt(item, id);
    if (true) {
      item.quantity -= 1;
    } else {
      return false;
    }
    if (item.quantity <= 20) {
      await this.presentAlert();
    } 
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Order Now!',
      message: 'Please order more medication!',
      buttons: ['OK']
    });

    await alert.present();
  }

  async editItemPrompt(item: { name: string; quantity: any }, id: any) {
    const toast = await this.toastCtrl.create({
      message: 'Editing Item-' + item + '...',
      duration: 3000
    });
    toast.present();
    this.inputDialogService.showPrompt(item, id);
  }

  addItem() {
    console.log('Adding Items');
    this.inputDialogService.showPrompt();
  }

  // Allow Camera Use

  async openCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };

    try {
      const imageData = await this.camera.getPicture(options);
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      this.uploadImage(base64Image);
    } catch (error) {
      console.error('Error while taking a picture', error);
    }
  }

  // Send image to server
  private uploadImage(imageData: string) {
    const apiUrl = 'http://localhost:8080/api/pills';
  
    const requestBody = { image: imageData };
  
    this.http.post(apiUrl, requestBody).subscribe(
      (response: any) => {
        console.log('Image uploaded successfully', response);
  
        const imageUrl = response.imageUrl;
        const newItemId = response._id;
  
        // Update the items array with the new item
        const newItem = { name: 'New Item', quantity: 1, imageUrl: imageUrl, id: newItemId };
        this.items.push(newItem);
      },
      (error: any) => {
        console.error('Error uploading image', error);
      }
    );
  }
}
