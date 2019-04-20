export class MessageTools {

  constructor() {

  }

  toastMsg(toastCtr, msg) {
    const toast = toastCtr.create({
      message: msg,
      duration: 3000,
      position: 'Middle'
    });
    toast.present();
  }

  alertMsg(alertCtrl, title, subtitle) {
    const alert = alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: ['OK']
    });
    alert.present();
  }


}
