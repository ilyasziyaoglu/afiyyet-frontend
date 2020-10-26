import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ContactFormService} from '../../../services/contactform.service';
import Swal from "sweetalert2";
import {Router} from '@angular/router';
import {UserService} from '../../../base/services/user.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

    scroll(id) {
        let el = document.getElementById(id);
        console.log("el", el)
        el.scrollIntoView({behavior:"smooth"});
    }

    advantages = [
        {
            icon: 'money_off',
            title: 'Maliyetinizi Azaltın',
            decription: 'Fiyat veya içerik güncellemelerinizde menü değiştirmekten veya yanına ekstra menü yaptırmaktan kurtulun. İçeriklerinizi istediğiniz zaman güncelleyerek sürekli güncel kalın',
        },
        {
            icon: 'speed',
            title: 'İş Yükünüzü Azaltın Zamandan Kazanın',
            decription: 'Akıllı Menü ile iş yükünüzü azaltabilecek ve müşterilerinize daha hızlı bir hizmet sunacaksınız',
        },
        {
            icon: 'nature_people',
            title: 'Çevre Dostu Olun',
            decription: 'Akıllı Menü kullanarak siz de doğayı koruyun',
        },
        {
            icon: 'sync',
            title: 'Sürekli Güncel Kalın',
            decription: 'Akıllı Menü size sınırsız içerik güncelleme hakkı sağlar. Menüde yaptığınız tüm değişiklikler anında müşterilerinize yansır',
        },
        {
            icon: 'app_blocking',
            title: 'Uygulama İndirmeden',
            decription: 'Akıllı Menünün sağladığı özellikleri müşterilerinize sunabilmek için herhangi bir uygulama indirilmesine gerek yoktur',
        },
        {
            icon: 'share',
            title: 'Akıllı Menü İle Her Yerdesiniz',
            decription: 'Akıllı Menünün linkini veya kare kodunu sosyal medya üzerinden paylaşarak, restoranınıza gelmeden uzaktan erişim ile menünüzü müşterilerinize tanıtabilir ve yeni müşteriler kazanabilirsiniz',
        },
    ];

    features = [
        {icon: 'qr_code_2', title: 'QR MENÜ'},
        {icon: 'tap_and_play', title: 'QR WIFI'},
        {icon: 'settings_applications', title: 'Ürün Ekleme ve Çıkarma'},
        {icon: 'low_priority', title: 'Ürün ve Kategorileri Sıralama'},
        {icon: 'loyalty', title: 'Kampanya Oluşturma'},
        {icon: 'assignment_turned_in', title: 'Rezervasyon Sistemi'},
        {icon: 'shopping_basket', title: 'Online Sipariş Sistemi'},
        {icon: 'favorite', title: 'Favorilere Ekleme'},
        {icon: 'thumb_up', title: 'Ürün Beğenme'},
        {icon: 'grading', title: 'Geri Bildirim Sistemi'},
        {icon: 'local_offer_features', title: 'İndirim Kuponu Oluşturma'},
        {icon: 'share', title: 'Sosyal Medya Paylaşımı'},
        {icon: 'analytics', title: 'Raporlar ve Müşteri Analizleri'},
        {icon: 'sync', title: 'Güncellemeler'},
        {icon: 'school', title: 'Yönetim Paneli Eğitimi'},
        {icon: 'access_time', title: '7 / 24 Kesintisiz Destek'},
    ];

    colors = ['blue', 'red', 'green', 'orange'/*, 'yellow', 'purple', 'pink', 'orange', 'brown'*/];

        contactForm = new FormGroup({
        fullName: new FormControl(''),
        phoneNumber: new FormControl(''),
        subject: new FormControl(''),
        message: new FormControl(''),
    });

    isLogged = false;
    constructor(
        private contactFormService: ContactFormService,
        public router: Router,
        private userService: UserService
    ) {
        if (userService.getUser()) { this.isLogged = true; }
    }

    ngOnInit(): void {
    }

    logout() {
        this.userService.logOut();
        this.isLogged = false;
        this.router.navigateByUrl('/pages/smartmenu/home');
    }

    onSubmit() {

        if ( !this.contactForm.valid ) {
            return;
        }
        this.contactFormService.post(this.contactForm.value, res => {
            if (res) {
                this.contactForm.reset();
                this.contactForm.markAsUntouched();
                Swal.fire('Başarılı', 'Mesajınız başarı ile alınmıştır. En kısa sürede size geri dönüş yapılacaktır.', 'success');
            } else {
                Swal.fire('Error', 'Mesajınızı iletirken bir hata oluştu!', 'error');
            }
        });
    }
}
