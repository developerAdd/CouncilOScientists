let items = document.querySelectorAll('.filter__text')
if (items.length > 0) {
   let addItems = document.querySelectorAll('.filter__list__text')
   let select = document.querySelector(".filter__text--header");
   for (const item of items) {
      item.addEventListener('click', () => {
         select.parentElement.parentElement.classList.remove('_active')
         select.classList.remove('__active')
      })
   }
   for (const addItem of addItems) {
      addItem.addEventListener('click', () => {
         select.classList.add('__active')
      })
   }
   function textList() {
      if (document.documentElement.scrollWidth <= 786) {
         let chekeds = document.querySelectorAll(".filter__input")
         for (const cheked of chekeds) {
            if (cheked.checked) {
               select.innerText = cheked.nextElementSibling.innerText;
            }
         }
      } else {
         let chekeds = document.querySelectorAll(".list__body .filter__input")
         select.innerText = "Другие категории"
         for (const cheked of chekeds) {
            if (cheked.checked) {
               select.innerText = cheked.nextElementSibling.innerText;
            }
         }
      }
   }

   window.addEventListener('load', textList)
   window.addEventListener('resize', textList)

}
let filtersTab = new Swiper('.filter__slider', {
   slidesPerView: "auto",
   freeMode: true,
   scrollbar: {
      el: ".filter__slider__scrollbar",
   },
   mousewheel: true,
});