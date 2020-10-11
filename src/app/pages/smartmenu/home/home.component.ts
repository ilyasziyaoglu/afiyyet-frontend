import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

    advantages = [
        {
            icon: 'money_off',
            title: 'Maliyetinizi Azaltın',
            decription: 'Fiyat veya içerik güncellemeleriniz de menü değiştirmekten veya yanına ekstra menü yaptırmaktan kurtulun. İçeriklerinizi istediğiniz zaman güncelleyerek sürekli güncel kalın',
        },
        {
            icon: 'speed',
            title: 'İş Yükünüzü Azaltın Zamandan Kazanın',
            decription: 'Akıllı Menü ile iş yükünüzü azaltabilecek ve müşterilerinize daha hızlı bir hizmet sunacaksınız',
        },
        {
            icon: 'nature_people',
            title: 'Çevre Dostu Olun',
            decription: 'Akıllı Menü kullanarak sizde doğayı koruyun',
        },
        {
            icon: 'sync',
            title: 'Sürekli Güncel Kalın',
            decription: 'Akıllı Menü size sınırsız içerik güncelleme hakkı sağlar. Menü de yaptığınız tüm değişiklikler anında müşterilerinize yansır',
        },
        {
            icon: 'app_blocking',
            title: 'Uygulama İndirmeden',
            decription: 'Akıllı Menü\'nün sağladığı özellikleri müşterilerinize sunabilmek için herhangi bir uygulama indirilmesine gerek yoktur',
        },
        {
            icon: 'share',
            title: 'Akıllı Menü İle Her Yerdesiniz',
            decription: 'Akıllı Menü\'nün linkini veya kare kodunu sosyal medya üzerinden paylaşarak restoranınıza gelmeden uzaktan erişim ile Menü\'nüzü müşterilerinize tanıtabilirsiniz ve yeni müşteriler kazanabilirsiniz',
        },
    ];

    features = [
        {icon: 'qr_code_2', title: 'QR okutarak menüyü açma'},
        {icon: 'tap_and_play', title: 'QR WIFI'},
        {icon: 'settings_applications', title: 'Ürün ekleme çıkarma'},
        {icon: 'low_priority', title: 'Ürün ve kategorileri sıralama'},
        {icon: 'school', title: 'Yönetim paneli eğitimi'},
        {icon: 'access_time', title: '7 / 24 Kesintisiz Destek'},
        {icon: 'sync', title: 'Güncellemeler'},
        {icon: 'thumb_up', title: 'Ürün beğenme'},
        {icon: 'favorite', title: 'Favorilere ekleme'},
        {icon: 'loyalty', title: 'Kampanya oluşturma'},
        {icon: 'assignment_turned_in', title: 'Rezervasyon Alma'},
        {icon: 'grading', title: 'Kolay geri bildirim'},
        {icon: 'local_offer_features', title: 'İndirim Kuponu Oluşturma'},
        {icon: 'share', title: 'Sosyal medya paylaşımı'},
        {icon: 'analytics', title: 'Raporlar ve Müşteri Analizleri'},
        {icon: 'emoji_emotions', title: 'Mutluluk seviyesi'},
        {icon: 'shopping_basket', title: 'Online sipariş alma'},
    ];

    colors = ['blue', 'red', 'green', 'orange'/*, 'yellow', 'purple', 'pink', 'orange', 'brown'*/];

    constructor() {
    }

    ngOnInit(): void {
    }

}
