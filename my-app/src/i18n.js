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
      ['az ??nce', '??imdi'],
      ['%s saniye ??nce', '%s saniye i??inde'],
      ['1 dakika ??nce', '1 dakika i??inde'],
      ['%s dakika ??nce', '%s dakika i??inde'],
      ['1 saat ??nce', '1 saat i??inde'],
      ['%s saat ??nce', '%s saat i??inde'],
      ['1 g??n ??nce', '1 g??n i??inde'],
      ['%s g??n ??nce', '%s g??n i??inde'],
      ['1 hafta ??nce', '1 hafta i??inde'],
      ['%s hafta ??nce', '%s hafta i??inde'],
      ['1 ay ??nce', '1 ay i??inde'],
      ['%s ay ??nce', '%s ay i??inde'],
      ['1 y??l ??nce', '1 y??l i??inde'],
      ['%s y??l ??nce', '%s y??l i??inde'],
    ][index];
  }
  register('tr',timeagoTR);

export default i18n;