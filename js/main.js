let windowEl = window;
let documentEl = document;
let htmlEl = document.documentElement;
let bodyEl = document.body;

const getHeaderHeight = () => {
   const headerHeight = document?.querySelector('.header').offsetHeight;
   document.querySelector(':root').style.setProperty('--header-height', `${headerHeight}px`);
}
const throttle = (func, delay = 250) => {
   let isThrottled = false;
   let savedArgs = null;
   let savedThis = null;

   return function wrap(...args) {
      if (isThrottled) {
         savedArgs = args,
            savedThis = this;
         return;
      }

      func.apply(this, args);
      isThrottled = true;

      setTimeout(() => {
         isThrottled = false;

         if (savedThis) {
            wrap.apply(savedThis, savedArgs);
            savedThis = null;
            savedArgs = null;
         }

      }, delay);
   }
};
const fixFullheight = () => {
   let vh = window.innerHeight;
   document.documentElement.style.setProperty('--vh', `${vh}px`);
};

let fixHeight = throttle(fixFullheight);

fixHeight();

window.addEventListener('resize', fixHeight, { passive: true });
let yourFunc = () => { getHeaderHeight() };
let func = throttle(yourFunc);
window.addEventListener('resize', func, { passive: true });

getHeaderHeight()

window.addEventListener("DOMContentLoaded", function () {
   [].forEach.call(document.querySelectorAll('.__tel'), function (input) {
      var keyCode;
      function mask(event) {
         event.keyCode && (keyCode = event.keyCode);
         var pos = this.selectionStart;
         if (pos < 3) event.preventDefault();
         var matrix = "+7 (___) ___-__-__",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[_\d]/g, function (a) {
               return i < val.length ? val.charAt(i++) || def.charAt(i) : a
            });
         i = new_value.indexOf("_");
         if (i != -1) {
            i < 3 && (i = 15);
            new_value = new_value.slice(0, i)
         }
         var reg = matrix.substr(0, this.value.length).replace(/_+/g,
            function (a) {
               return "\\d{1," + a.length + "}"
            }).replace(/[+()]/g, "\\$&");
         reg = new RegExp("^" + reg + "$");
         if (!reg.test(this.value) || this.value.length < 3 || keyCode > 47 && keyCode < 58) this.value = new_value;
         if (event.type == "blur" && this.value.length < 5) this.value = ""
      }

      input.addEventListener("input", mask, false);
      input.addEventListener("focus", mask, false);
      input.addEventListener("blur", mask, false);
      input.addEventListener("keydown", mask, false)

   });

});

let scrolls = document.querySelectorAll(".block-scroll");
for (const el of scrolls) {
   let scroll = new Swiper(el, {
      direction: "vertical",
      slidesPerView: "auto",
      freeMode: true,
      scrollbar: {
         el: ".block-scrollBar",
      },
      mousewheel: true,
   });
   function slideUpdate() {
      if (!el.classList.contains('swiper-delay')) {
         setTimeout(() => {
            scroll.update()
         }, 1);
      } else {
         setTimeout(() => {
            scroll.update()
         }, 101);
      }
   }
   let scrollMoreBtns = document.querySelectorAll(".menu__lists .list__more");
   let scrollListBtns = document.querySelectorAll(".menu__lists .list__header");
   let menuMobileBnts = document.querySelectorAll(".menu__punct");
   let menuMobileBackBnts = document.querySelectorAll(".menu__lists__header");
   let mobileLists = document.querySelectorAll(".menu__lists");
   let mobileListBacks = document.querySelectorAll(".list__back__header");

   let updatesliderBtns = document.querySelectorAll(".resize-btn");
   const mainMenuBtnBack = document.querySelector(".menuMobile__header__back");
   let flag = 1;

   window.addEventListener('resize', () => {
      for (const menuMobileBnt of menuMobileBnts) {
         menuMobileBnt.classList.remove('__hiddenMobile')
         menuMobileBnt.classList.remove('_active')
      }
      for (const menuMobileBnt of menuMobileBnts) {
         menuMobileBnt.classList.remove('__hiddenMobile')
         menuMobileBnt.classList.remove('_active')
      }
      for (const mobileList of mobileLists) {
         let btns = mobileList.querySelectorAll('.menu__list')
         for (const btn of btns) {
            mobileList.querySelector('.menu__lists__header').classList.remove('__hiddenMobile')
            btn.classList.remove('__hiddenMobile')
            btn.classList.remove('_active')
         }
      }
   })
   mainMenuBtnBack.addEventListener('click', () => {
      if (flag == 1) {
         mainMenu.classList.remove('__show')
         mainBtnMenu.classList.remove('__remove')
         enableScroll()
      } else if (flag == 2) {
         for (const menuMobileBnt of menuMobileBnts) {
            menuMobileBnt.classList.remove('__hiddenMobile')
            menuMobileBnt.classList.remove('_active')
            slideUpdate()
            flag = 1;
         }
      } if (flag == 3) {
         for (const mobileList of mobileLists) {
            let btns = mobileList.querySelectorAll('.menu__list')
            for (const btn of btns) {
               mobileList.querySelector('.menu__lists__header').classList.remove('__hiddenMobile')
               btn.classList.remove('__hiddenMobile')
               btn.classList.remove('_active')
               flag = 2;
            }
         }
      }
   })
   for (const menuMobileBackBnt of menuMobileBackBnts) {
      menuMobileBackBnt.addEventListener('click', () => {
         for (const menuMobileBnt of menuMobileBnts) {
            menuMobileBnt.classList.remove('__hiddenMobile')
            menuMobileBnt.classList.remove('_active')
            slideUpdate()
         }
         flag = 1;
      })
   }
   for (const updatesliderBtn of updatesliderBtns) {
      updatesliderBtn.addEventListener('click', slideUpdate)
   }
   for (const scrollListBtn of scrollListBtns) {
      scrollListBtn.addEventListener('click', slideUpdate)
   }
   for (const scrollMoreBtn of scrollMoreBtns) {
      scrollMoreBtn.addEventListener('click', slideUpdate)
   }
   for (const mobileList of mobileLists) {
      let btns = mobileList.querySelectorAll('.menu__list')

      for (const btn of btns) {
         btn.firstElementChild.addEventListener('click', () => {
            if (!btn.classList.contains('__defualt')) {
               console.log('s');
               for (const btn of btns) {
                  mobileList.querySelector('.menu__lists__header').classList.add('__hiddenMobile')
                  btn.classList.add('__hiddenMobile')
                  slideUpdate()
               }
               flag = 3;
            }
         })
      }
   }
   for (const mobileList of mobileLists) {
      let btns = mobileList.querySelectorAll('.menu__list')

      for (const mobileListBack of mobileListBacks) {
         mobileListBack.addEventListener('click', () => {
            for (const btn of btns) {
               mobileList.querySelector('.menu__lists__header').classList.remove('__hiddenMobile')
               btn.classList.remove('__hiddenMobile')
               btn.classList.remove('_active')
               slideUpdate()
            }
            flag = 2;
         })
      }
   }
   let scrollTabs = document.querySelectorAll(".menu__item");
   for (const scrollTab of scrollTabs) {
      scrollTab.addEventListener('click', () => {
         for (const menuMobileBnt of menuMobileBnts) {
            menuMobileBnt.classList.add('__hiddenMobile')
         }
         flag = 2;
         slideUpdate()
      })
   }
}

let sliders = document.querySelectorAll(".slider__content");
for (const el of sliders) {
   let slider = new Swiper(el, {
      slidesPerView: 1.225,
      loop: false,
      touchAngle: 60,
      slidesOffsetBefore: 16,
      slidesOffsetAfter: 16,
      spaceBetween: 24,
      lazy: {
         loadPrevNext: true,
         loadPrevNextAmount: 2
      },
      navigation: {
         nextEl: '.btn__next',
         prevEl: '.btn__prev'
      },
      breakpoints: {
         993: {
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            slidesPerView: 3,
            spaceBetween: 24,
            loop: true,
         },
         576: {
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            slidesPerView: 2,
            spaceBetween: 24,
            loop: true,
         },
      }
   });

}

const svapInputs = document.querySelectorAll(".svap-placeholder");
if (svapInputs.length > 0) {
   for (const svapInput of svapInputs) {
      function svap() {
         if (document.documentElement.scrollWidth < 475) {
            svapInput.setAttribute('placeholder', 'Введите запрос')
         } else {
            svapInput.setAttribute('placeholder', 'Введите профессию, тему или название курса')
         }
      }
      svap();
      window.addEventListener('resize', svap, { passive: true })
   }
}

const valuesBar = document.querySelectorAll(".school__bar--value");
if (valuesBar.length > 0) {
   for (const valueBar of valuesBar) {
      let percent = valueBar.getAttribute('data-percent');
      valueBar.style.width = percent + '%'
   }
}

function enableScroll() {
   if (bodyEl.classList.contains('dis-scroll')) {
      const fixBlocks = document?.querySelectorAll('.fixed-block');
      const fixBlocksOnlypadding = document?.querySelectorAll('.lock__padding');
      const pagePosition = parseInt(bodyEl.dataset.position, 10);
      fixBlocks.forEach(el => { el.style.paddingRight = '0px'; });
      fixBlocksOnlypadding.forEach(el => { el.style.paddingRight = '0px'; });
      bodyEl.style.paddingRight = '0px';

      bodyEl.style.top = 'auto';
      bodyEl.classList.remove('dis-scroll');
      window.scroll({
         top: pagePosition,
         left: 0
      });
      bodyEl.removeAttribute('data-position');
   }
}
function disableScroll() {
   if (!bodyEl.classList.contains('dis-scroll')) {
      const fixBlocks = document?.querySelectorAll('.fixed-block');
      const fixBlocksOnlypadding = document?.querySelectorAll('.lock__padding');
      const pagePosition = window.scrollY;
      const paddingOffset = `${(window.innerWidth - bodyEl.offsetWidth)}px`;

      htmlEl.style.scrollBehavior = 'none';
      fixBlocks.forEach(el => { el.style.paddingRight = paddingOffset; });
      fixBlocksOnlypadding.forEach(el => { el.style.paddingRight = paddingOffset; });
      bodyEl.style.paddingRight = paddingOffset;
      bodyEl.classList.add('dis-scroll');
      bodyEl.dataset.position = pagePosition;
      bodyEl.style.top = `-${pagePosition}px`;
   }
}
let popupLinks = document.querySelectorAll('.popup__link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock__padding");

let unlock = true;

const timeout = 0;

if (popupLinks.length > 0) {
   for (let index = 0; index < popupLinks.length; index++) {
      const popupLink = popupLinks[index];
      popupLink.addEventListener("click", function (e) {
         if (popupLink.getAttribute('data-popupId') != null) {
            const popupName = popupLink.getAttribute('data-popupId').replace('#', '');
            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            e.preventDefault();
         }
      });
   }
}
const popupCloseIcon = document.querySelectorAll('.close__popup');
if (popupCloseIcon.length > 0) {
   for (let index = 0; index < popupCloseIcon.length; index++) {
      const el = popupCloseIcon[index];
      el.addEventListener('click', function (e) {
         popupClose(el.closest('.popup'));
         e.preventDefault();
      });
   }
}

function popupOpen(curentPopup) {
   if (curentPopup && unlock) {
      const popupActive = document.querySelector('.popup.open');
      if (popupActive) {
         popupClose(popupActive, false);
      } else {
         bodyLock();
      }
      curentPopup.classList.add('open');
      curentPopup.addEventListener("click", function (e) {
         if (!e.target.closest('.popup__content')) {
            popupClose(e.target.closest('.popup'));
         }
      });
   }
}
function popupClose(popupActive, doUnlock = true) {
   if (unlock) {
      popupActive.classList.remove('open');
      if (doUnlock) {
         bodyUnLock();
      }
   }
}

function bodyLock() {
   const lockPaddingValue = window.innerWidth - document.querySelector('body').offsetWidth + 'px';

   if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
         const el = lockPadding[index];
         el.style.paddingRight = lockPaddingValue;
      }
   }
   body.style.paddingRight = lockPaddingValue;
   body.classList.add('lock');

   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, timeout);
}

function bodyUnLock() {
   setTimeout(() => {
      for (let index = 0; index < lockPadding.length; index++) {
         const el = lockPadding[index];
         el.style.paddingRight = '0px';
      }
      body.style.paddingRight = '0px';
      body.classList.remove('lock');
   }, timeout);

   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, timeout);
}

document.addEventListener('keydown', function (e) {
   if (e.which === 27) {
      const popupActive = document.querySelector('.popup.open');
      popupClose(popupActive);
   }
});

(function () {
   if (!Element.prototype.closest) {
      Element.prototype.closest = function (css) {
         let node = this;
         while (node) {
            if (node.matches(css)) return node;
            else node = node.parentElement;
         }
         return null
      };
   }
})();
(function () {
   if (!Element.prototype.matches) {
      Element.prototype.matches = Element.prototype.matchesSelector ||
         Element.prototype.webkitMatchesSelector ||
         Element.prototype.webkitMatchesSelector ||
         Element.prototype.msMatchesSelector;
   }
})();


let lists = document.querySelectorAll(".list");
if (lists.length > 0) {
   for (const list of lists) {
      let items = list.querySelectorAll('.list__pick')
      if (items.length > 0) {
         let headerText = list.querySelector(".list__pickText");

         for (const item of items) {
            item.addEventListener('click', () => {
               headerText.innerText = item.innerText
               list.classList.remove('_active')
            })
         }
      }
      let header = list.querySelector('.list__header')

      header.addEventListener('click', (e) => {
         list.classList.toggle('_active')
      })
   }
}

const tabs = document.querySelectorAll(".tab__parent");
if (tabs.length > 0) {
   for (const tab of tabs) {
      let links = tab.querySelectorAll('.__tab__link')

      for (const link of links) {
         link.addEventListener('click', () => {
            let tabId = link.getAttribute('data-tabId')
            let activeTab = document.getElementById(tabId);
            tab.querySelector(".__tab__link.__active")?.classList.remove('__active');
            tab.querySelector(".__tab.__show").classList.remove('__show');
            activeTab.classList.add('__show')
            link.classList.add('__active')
         })
      }
   }
}


let moreBtns = document.querySelectorAll(".btn__more");
if (moreBtns.length > 0) {
   for (const moreBtn of moreBtns) {
      let textBtn = moreBtn.innerText;
      let items = moreBtn.parentElement.querySelectorAll('.__transition .list__item')
      let height = items[0].scrollHeight + items[1].scrollHeight + items[2].scrollHeight + items[3].scrollHeight + items[4].scrollHeight + 109;
      if (document.documentElement.scrollWidth > 640 && moreBtn.parentElement.classList.contains('__transition')) {
         moreBtn.parentElement.style.height = height + 'px';
      }
      moreBtn.addEventListener('click', () => {
         if (!moreBtn.parentElement.classList.contains('__transition')) {
            if (moreBtn.parentElement.classList.toggle('__show')) {
               textBtn = moreBtn.innerText;
               moreBtn.innerText = "скрыть"
            } else {
               moreBtn.innerText = textBtn;
            }
         } else if (document.documentElement.scrollWidth > 640) {
            if (moreBtn.parentElement.classList.toggle('__show')) {
               moreBtn.parentElement.style.height = moreBtn.parentElement.scrollHeight + 'px';
               textBtn = moreBtn.innerText;
               moreBtn.innerText = "скрыть"
            } else {
               moreBtn.parentElement.style.height = height + 'px';
               moreBtn.innerText = textBtn;
            }
         }
      })
   }
}
window.addEventListener('resize', () => {
   for (const moreBtn of moreBtns) {
      if (!moreBtn.parentElement.classList.contains('__transition')) {
         if (document.documentElement.scrollWidth < 640) {
            moreBtn.parentElement.style.height = 'auto';
         } else {
            let items = moreBtn.parentElement.querySelectorAll('.__transition .list__item')
            let height = items[0].scrollHeight + items[1].scrollHeight + items[2].scrollHeight + items[3].scrollHeight + items[4].scrollHeight + 109;
            moreBtn.parentElement.style.height = height + 'px';
         }
      }
   }
})
const header = document.querySelector(".header");
const burger = document.querySelector(".burger");
const menuMobile = document.querySelector(".menuMobile");
const mainBtnMenu = document.querySelector(".header__btn");
const aboutBtnsMenu = document?.querySelectorAll(".menu-btn");
const mainMenu = document.querySelector(".menu");

mainBtnMenu.addEventListener('click', () => {
   if (mainMenu.classList.toggle('__show')) {
      menuMobile.classList.remove('__show')
      burger.classList.remove('__remove')
      disableScroll()
   } else {
      enableScroll()
   }
   mainBtnMenu.classList.toggle('__remove')
})
for (const aboutBtnMenu of aboutBtnsMenu) {
   aboutBtnMenu?.addEventListener('click', () => {
      if (mainMenu.classList.toggle('__show')) {
         menuMobile.classList.remove('__show')
         burger.classList.remove('__remove')
         disableScroll()
      } else {
         enableScroll()
      }
      mainBtnMenu.classList.toggle('__remove')
   })
}


burger.addEventListener('click', () => {
   if (menuMobile.classList.toggle('__show')) {
      mainMenu.classList.remove('__show')
      mainBtnMenu.classList.remove('__remove')
      disableScroll()
   } else {
      enableScroll()
   }
   burger.classList.toggle('__remove')
})

function shadowHeader() {
   if (document.documentElement.scrollWidth > 992) {
      if (document.documentElement.scrollTop > document.querySelector(".fastmenu").scrollHeight) {
         header.classList.add('__box')
      } else {
         header.classList.remove('__box')
      }
   } else {
      header.classList.add('__box')
   }
}


window.addEventListener('load', shadowHeader)
window.addEventListener('scroll', shadowHeader, { passive: true })
window.addEventListener('resize', shadowHeader, { passive: true })

const acardions = document.querySelectorAll(".acardion");

if (acardions.length > 0) {
   for (const acardion of acardions) {
      let header = acardion.querySelector('.acardion__header');
      let body = acardion.querySelector('.acardion__body');

      header.addEventListener('click', () => {
         if (acardion.classList.toggle('__show')) {
            body.style.maxHeight = body.scrollHeight + 'px'
         } else {
            body.style.maxHeight = '0px'
         }
      })
      window.addEventListener('resize', () => {
         if (acardion.classList.contains('__show')) {
            body.style.maxHeight = body.scrollHeight + 'px'
         } else {
            body.style.maxHeight = '0px'
         }
      }, { passive: true })
   }
}


const inputsCopy = document.querySelectorAll(".input-copy");
if (inputsCopy.length > 0) {
   for (const inputCopy of inputsCopy) {
      let text = inputCopy.querySelector("input");
      let btn = inputCopy.querySelector("button");
      let mes = inputCopy.querySelector("span");
      btn.onclick = function () {
         text.select();
         document.execCommand("copy");
         mes.classList.add('__show')
         setTimeout(() => {
            mes.classList.remove('__show')
         }, 2000);
      }
   }
}

const selects = document.querySelectorAll(".__select");
if (selects.length > 0) {
   for (const select of selects) {
      let selectStandart = select.querySelector('select')
      let text = select.querySelector('.__select__text')
      selectStandart.addEventListener('change', () => {
         text.innerText = selectStandart.options[selectStandart.selectedIndex].text
         selectStandart.previousElementSibling.classList.remove('__active')
      })
      selectStandart.addEventListener('focus', () => {
         selectStandart.previousElementSibling.classList.add('__active')
      })
      selectStandart.addEventListener('blur', () => {
         selectStandart.previousElementSibling.classList.remove('__active')
      })
   }
}


let menuLists = document.querySelectorAll(".menu__list");
for (const menuList of menuLists) {
   let itemsChild = menuList.querySelectorAll('a.list__item');
   if (itemsChild.length == 0) {
      menuList.classList.add('__defualt')
   }
}