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
const btnfilterMore = document?.querySelector('.filters__btn')
const tabfilterMore = document?.querySelector('.filters__block')
let btnfilterMoreText = btnfilterMore.querySelector('.__inherit');
btnfilterMore.addEventListener('click', () => {
   if (tabfilterMore.classList.toggle('__show')) {
      tabfilterMore.style.maxHeight = tabfilterMore.scrollHeight + 'px';
      btnfilterMoreText.innerText = 'Скрыть фильтр'
   } else {
      tabfilterMore.style.maxHeight = '0px';
      btnfilterMoreText.innerText = 'Показать фильтр'
   }
})

const showMoreParents = document.querySelectorAll(".listMore");
if (showMoreParents.length > 0) {
   for (const showMoreParent of showMoreParents) {

      const showMore = showMoreParent.querySelector('.btn__loading button');
      const productsLength = showMoreParent.querySelectorAll('.show__item').length;
      let items = showMoreParent.getAttribute('data-startCountItems')
      function itemsStart() {
         if (items != "varible") {
            items = parseInt(items);
         } else {
            if (document.documentElement.scrollWidth > 992) {
               items = 9
            } else if (document.documentElement.scrollWidth > 768) {
               items = 6
            } else {
               items = 3
            }
         }
      }
      itemsStart()
      window.addEventListener('load', itemsStart)
      let itemsPlus = parseInt(showMoreParent.getAttribute('data-itemsPlus'))
      showMore.addEventListener('click', () => {
         items += itemsPlus;
         const array = Array.from(showMoreParent.children);
         const visItems = array.slice(0, items);
         showMore.parentElement.classList.add('_load')
         setTimeout(() => {
            visItems.forEach(el => el.classList.add('is-visible'));
            if (visItems.length === productsLength) {
               showMore.style.display = 'none';
            }
            showMore.parentElement.classList.remove('_load')
         }, 1000);

      });
   }
}

'use strict';
function r() {
   if (!document.getElementsByClassName) {
      var getElementsByClassName = function (node, classname) {
         var a = [];
         var re = new RegExp('(^| )' + classname + '( |§)');
         var els = node.getElementsByTagName("*");
         for (var i = 0, j = els.length; i < j; i++)
            if (re.test(els[i].className)) a.push(els[i]);
         return a;
      }
      var videos = getElementsByClassName(document.body, "youtube");
   } else {
      var videos = document.getElementsByClassName("youtube");
   }
   var nb_videos = videos.length;
   for (var i = 0; i < nb_videos; i++) {
      let id = videos[i].getAttribute('data-id')
      videos[i].style.backgroundImage = 'url(http://i.ytimg.com/vi_webp/' + id + '/sddefault.webp)';
      var play = document.createElement("div");
      play.setAttribute("class", "play");
      videos[i].appendChild(play);
      videos[i].onclick = function () {
         var iframe = document.createElement("iframe");
         var iframe_url = "https://www.youtube.com/embed/" + id + "?autoplay=1&autohide=1";
         if (this.getAttribute("data-params")) iframe_url += '&' + this.getAttribute("data-params");
         iframe.setAttribute("allowfullscreen", "allowfullscreen");
         iframe.setAttribute("src", iframe_url);
         iframe.setAttribute("loading", 'lazy');
         iframe.setAttribute("title", 'video');
         iframe.setAttribute("frameborder", '0');
         iframe.style.width = this.style.width;
         iframe.style.height = this.style.height;
         this.parentNode.replaceChild(iframe, this);
      }
   }
}
window.addEventListener('load', r)

const oterTabs = document.querySelectorAll('.othercourse__tab')

for (const oterTab of oterTabs) {
   let btn = oterTab.querySelector('.othercourse__more')
   let content = oterTab.querySelector('.othercourse__coursernames')
   let items = oterTab.querySelectorAll('.othercourse__col')
   btn.addEventListener('click', () => {
      if (content.classList.toggle('__show')) {
         console.log(content.scrollHeight);
         content.style.maxHeight = content.scrollHeight + 'px';
         btn.innerText = 'Скрыть'
      } else {
         if (document.documentElement.scrollWidth > 768) {
            content.style.maxHeight = Math.max(+items[0].scrollHeight, +items[1].scrollHeight, +items[2].scrollHeight) + 'px';
         } else {
            content.style.maxHeight = (+items[0].scrollHeight + +items[1].scrollHeight + +items[2].scrollHeight) + 'px';
         }
         btn.innerText = 'Читать  далее'
      }
   })

}
function otherList() {
   for (const oterTab of oterTabs) {
      let btn = oterTab.querySelector('.othercourse__more')
      let items = oterTab.querySelectorAll('.othercourse__col')
      let content = oterTab.querySelector('.othercourse__coursernames')
      if (content.classList.contains('__show')) {
         console.log(content.scrollHeight);
         content.style.maxHeight = content.scrollHeight + 'px';
         btn.innerText = 'Скрыть'
      } else {
         if (document.documentElement.scrollWidth > 768) {
            content.style.maxHeight = Math.max(+items[0].scrollHeight, +items[1].scrollHeight, +items[2].scrollHeight) + 'px';
         } else {
            content.style.maxHeight = (+items[0].scrollHeight + +items[1].scrollHeight + +items[2].scrollHeight) + 'px';
         }
         btn.innerText = 'Читать  далее'
      }
   }
}
window.addEventListener('load', otherList)
window.addEventListener('resize', otherList)

let filtersTab = new Swiper('.filter__slider', {
   slidesPerView: "auto",
   freeMode: true,
   scrollbar: {
      el: ".filter__slider__scrollbar",
   },
   mousewheel: true,
});