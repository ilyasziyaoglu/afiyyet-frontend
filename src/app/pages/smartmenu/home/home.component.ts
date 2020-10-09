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
            title: 'Maliyetten Kazanın',
            decription: 'Artık her fiyat veya içerik güncellemenizde menü değiştirmekten veya yanına ekstra menü yaptırmaktan kurtulun. İçeriklerinizi maliyetsizce güncelleyin.',
        },
        {
            icon: 'speed',
            title: 'İş Yükünüzü Azaltın',
            decription: 'Akıllı Menü sayesinde iş yükünü azaltabilecek ve müşterilerinizi bekletmeyeceksiniz.',
        },
        {
            icon: 'nature_people',
            title: 'Çevre Dostu Olun',
            decription: 'Akıllı Menü kullanarak doğayı korumaya destek olun.',
        },
        {
            icon: 'sync',
            title: 'Sürekli Güncel Kalın',
            decription: 'Sınırsız içerik güncelleme hakkı. Yönetim paneli üzerinden yağtığınız tüm değişiklikler anında müşterilerinize yansır.',
        },
        {
            icon: 'app_blocking',
            title: 'Uygulama İndirmeden',
            decription: 'Üstelik Akıllı Menü\'nün bu özelliklerini müşterilerinize sunabilmek için herhangi bir uygulama indirmelerine gerek yok.',
        },
        {
            icon: 'share',
            title: 'Sosyal Medyada Paylaş',
            decription: 'Akıllı Menünün linkini veya kare kodunu sosyal medya üzerinden paylaşabilirsiniz.',
        },
    ];

    features = [
        {icon: 'qr_code_2', title: 'QR okutarak menüyü açma'},
        {icon: 'tap_and_play', title: 'QR WIFI'},
        {icon: 'settings_applications', title: 'Ürün ekleme çıkarma'},
        {icon: 'low_priority', title: 'Ürün ve kategorileri sıralama'},
        {icon: 'school', title: 'Yönetim paneli eğitimi'},
        {icon: 'access_time', title: '7 / 24 Kesintisiz Destek'},
        {icon: 'thumb_up', title: 'Ürün beğenme'},
        {icon: 'favorite', title: 'Favorilere ekleme'},
        {icon: 'loyalty', title: 'Kampanya oluşturma'},
        {icon: 'sync', title: 'Güncellemeler'},
        {icon: 'grading', title: 'Kolay geri bildirim'},
        {icon: 'local_offer_features', title: 'İndirim Kuponu Oluşturma'},
        {icon: 'assignment_turned_in', title: 'Rezervasyon Alma'},
        {icon: 'share', title: 'Sosyal medya paylaşımı'},
        {icon: 'analytics', title: 'Raporlar ve Müşteri Analizleri'},
        {icon: 'emoji_emotions', title: 'Mutluluk seviyesi'},
    ];

    colors = ['blue', 'red', 'green'/*, 'yellow', 'purple', 'pink', 'orange', 'brown'*/];

    constructor() {
    }

    ngOnInit(): void {
    }

}
