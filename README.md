# Hoaxify-App-With-Spring-Boot-And-React

Gereksinimler:
--
* JDK 11 kurulu olmalı : http://jdk.java.net/java-se-ri/11 (OpenJDK) İşletim sistemininize uygun indirme bağlantısını kullanarak bilgisayarınıza JDK 11 kurunuz. Ayrıca terminalden jar dosyası çalıştırılmak istenirse ortam değişkeni (PATH) ayarlanmış olmalı.

* Derleme için Maven kurulu olmalıdır. 

    İndirme Bağlantısı: https://maven.apache.org/download.cgi
    
    https://maven.apache.org/install.html adresinden kurulum adımlarını inceleyebilirsiniz. 

    Maven ortam değişkenlerinde (PATH) kayıtlı olmalıdır. 
    Bkz: Path ayarlama
  

---

* Kurulumlardan sonra:

    Terminal üzerinde: 

        git clone https://github.com/furkaninch/Hoaxify-App-With-Spring-Boot-And-React.git
    (Git Kurulu olmalıdır bu komut için)

    İlgili Klasöre giriniz ve react dosyasini calistiriniz

        cd my-app
        npm start

    Sonrasinda IDE uzerinde ws klasorunu acarak server'i baslatiniz. 

    React uzerinde proxy icin 8080 portu kullanilmistir tum API requestler bu porta gitmektedir lutfen serverin bu portta calistigindan emin olunuz.

    Uygulama acilirken 25 adet kullanici olusturulur isterseniz buradan kullanici adi ve sifreyi alarak login olabilirsiniz, isterseniz de yeni bir uyelik olusturabilirsiniz.
    
---
---        

Uygulama özellikleri:
--
* Tum sayfalar react i18next kullanilarak Ingilizce ve Turkce dil destegine sahip hale getirilmistir.
* Her kullanici icin unique bir username vardir.
* Kullanicilar hoax'larina belirli tipteki dosyalari ekleyebilmektedir.
* Kullanicilar isterlerse profil resmi ve display name ozelliklerini sonrasinda degistirebilir.
* Kullanicilar ana sayfadayken baska kullanicilar Hoax paylasirsa bununla ilgili bildirim alir ve yeni hoaxlari yukleyebilir.
* Kullanicilar kendi hoaxlarini silebilir fakat diger kullanicilarin hoaxlari ile ilgili herhangi bir islem yapamazlar.
* Networkun yavas oldugu durumlarda yapilan islemlerle ilgili kullanicilara o anki buton ya da sayfada spinner kullanilarak progress ile ilgili yukleniyor bilgisi verilir.
* Kullanicilar ana sayfada baska kullanicilari kesfedebilir ve onlarin sayfalarina gidebilir.

---
Kod standartlarına uygun yazılım geliştirilmiştir:

* OOP odaklı Katmanlı mimari kullanılmıştır. 

        Data erişim katmanı 
        Servis Katmanı
        Sunum Katmanı
        Interface'ler kullanılmıştır.

---

Kullanılan Teknoloji & Yazılımlar
--
Spring Boot, Spring Security, JPA-Hibernate, Maven, HTML, CSS, JS, React.js, Axios, Bootstrap, Lombok, Redux, Hooks, react-i18next 


---

NOTLAR
--
Bazı IDE'lerde lombok plugini problem çıkarmaktadır. Getter ve setter gibi metodlar görünmezse bu problem var demektir. İlgili IDE'ye lombok plugini yüklenmeli.

