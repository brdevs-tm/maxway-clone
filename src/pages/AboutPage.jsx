import React, { Fragment } from "react";

const AboutPage = () => {
  document.title = "About Us";
  return (
    <Fragment>
      <div className="containerown flex flex-col items-start gap-10 pt-32 pb-12">
        <img
          src="https://maxway.uz/_next/image?url=%2Fimages%2Fabout.png&w=1920&q=75"
          alt="maxway"
          className="rounded-[20px]"
        />
        <p>
          Kompaniya 2005 yilning fevral oyida Toshkent shahrida tashkil etilgan.
          Hozirda kompaniyaning Toshkent shahrida 18 ta filiali mavjud. Taomnoma
          asosan klаb sendvichlari, hot-doglar, burgerlar, lavashlar va
          donarlardan iborat. Bizning ustuvor yo'nalishlarimiz -
          ingredientlarning yangiligi va sifati, qo'shimchalarning
          xilma-xilligi, arzon narxlar va mehmonlarning takliflariga e'tibor.
          Har kuni turli xil odamlar MaxWay-dan buyurtma berishadi. Biz esa
          tashrif buyuruvchilar sonini ham, filiallar sonini ham oshirishga
          harakat qilmoqdamiz. Har bir tayyorlangan taom bilan biz o'ziga xos
          retseptlarning tafsilotlarini aniqlaymiz va sizning sevimli brendingiz
          bo'lishda davom etish uchun narx va sifatning mukammal muvozanatini
          qidiramiz. Agar siz kutilmaganda biz tomondan yomon xizmat yoki past
          sifatli pishirilgan taomga duch kelsangiz, bizga{" "}
          <a href="https://t.me/maxwaymasterfood_bot">@maxwaymasterfood_bot</a>
          manziliga murojaat qiling. Biz ijobiy va salbiy fikr-mulohazalarni
          mamnuniyat bilan qabul qilamiz. Mehmonning shikoyati - bu sovg'a, bu
          tufayli bizda o'sish uchun maqsad bo’ladi.
        </p>
      </div>
    </Fragment>
  );
};

export default AboutPage;
