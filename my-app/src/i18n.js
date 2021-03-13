import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {register} from 'timeago.js';

i18n.use(initReactI18next).init({
    fallbackLng: 'en',
    defaultNS: 'translations',
    ns: ['translations'],
    interpolation:{
        escapeValue: false,
        formatSeparator: ','
    },
    resources:{
        en: {
            translations: {
                'Sign Up': 'Sign Up',
                'password mismatch': 'password mismatch',
                'Username': 'Username',
                'Display Name': 'Display Name',
                'Password': 'Password',
                'Password Repeat': 'Password Repeat',
                'Login': 'Login',
                'Log Out': 'Log Out',
                'Users': 'Users',
                'Next': 'Next',
                'Previous': 'Previous',
                'Load Failure': 'Load Failure',
                'User not found': 'User not found',
                'Edit': 'Edit',
                'Save': 'Save',
                'Cancel': 'Cancel',
                'Change Display Name': 'Change Display Name',
                'My Profile': 'My Profile',
                'There are no hoaxes': 'There are no hoaxes',
                'See more Hoaxes': 'See more Hoaxes',
                'See new hoaxes': 'See new hoaxes',
                'Hoax has unsupported attachment!': 'Hoax has unsupported attachment!',
                'Delete Hoax': 'Delete Hoax',
                'Are you sure you want to delete this Hoax? You can not undo this action!': 'Are you sure you want to delete this Hoax? You can not undo this action!',
                'Are you sure you want to delete this User? You can not undo this action!': 'Are you sure you want to delete this User? You can not undo this action!',
                'Delete': 'Delete',
                'Delete User': 'Delete User'
            }
        },
        tr: {
            translations: {
                'Sign Up': 'Kayit Ol',
                'password mismatch': 'parolalar uyusmuyor',
                'Username': 'Kullanici Adi',
                'Display Name': 'Goruntulenecek Isim',
                'Password': 'Sifre',
                'Password Repeat': 'Sifre Tekrar',
                'Login': 'Giris',
                'Log Out': 'Cikis Yap',
                'Users': 'Kullanicilar',
                'Next': 'Ileri',
                'Previous': 'Onceki',
                'Load Failure': 'Yuklenemedi',
                'User not found': 'Kullanici bulunamadi',
                'Edit' : 'Duzenle',
                'Save': 'Kaydet',
                'Cancel': 'Iptal Et',
                'Change Display Name': 'Goruntulenecek ismi duzenle',
                'My Profile': 'Profilim',
                'There are no hoaxes' : 'Hic bir hoax bulunamadi',
                'See more Hoaxes': 'Daha fazla Hoax goruntule',
                'See new hoaxes' : 'Yeni hoaxlari gor',
                'Hoax has unsupported attachment!': 'Hoax desteklenmeyen bir dosta turu iceriyor!',
                'Delete Hoax': 'Hoaxu Sil',
                'Are you sure you want to delete this Hoax? You can not undo this action!': 'Bu Hoaxu silmek istediginize emin misiniz? Bu eylem geri alinamaz!',
                'Are you sure you want to delete this User? You can not undo this action!': 'Bu Kullaniciyi silmek istediginize emin misiniz? Bu eylem geri alinamaz!',
                'Delete': 'Sil',
                'Delete User': 'Kullaniciyi Sil'
            }
        }
    },
    react:{
        wait: true
    }

})
const timeagoTR = (number,index) => {
    return [
      ['az önce', 'şimdi'],
      ['%s saniye önce', '%s saniye içinde'],
      ['1 dakika önce', '1 dakika içinde'],
      ['%s dakika önce', '%s dakika içinde'],
      ['1 saat önce', '1 saat içinde'],
      ['%s saat önce', '%s saat içinde'],
      ['1 gün önce', '1 gün içinde'],
      ['%s gün önce', '%s gün içinde'],
      ['1 hafta önce', '1 hafta içinde'],
      ['%s hafta önce', '%s hafta içinde'],
      ['1 ay önce', '1 ay içinde'],
      ['%s ay önce', '%s ay içinde'],
      ['1 yıl önce', '1 yıl içinde'],
      ['%s yıl önce', '%s yıl içinde'],
    ][index];
  }
  register('tr',timeagoTR);

export default i18n;