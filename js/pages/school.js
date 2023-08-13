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

const inputs = document.querySelectorAll(".school__write__stars input");
const text = document.getElementById('resultFeedback');

function resultFeedback(value = null) {
   if (value != null) {
      text.innerText = `Общая оценка ${value}/5`
   } else {
      text.innerText = 'Общая оценка'
   }
}
for (const input of inputs) {
   input.addEventListener('change', () => {
      resultFeedback(input.value)
   })
}
resultFeedback()
const schoolHeader = document.querySelector(".school__header");
const schoolFooter = document.querySelector(".school__footer");
const schoolbtnScrollTop = document.querySelector(".school__scrollTop");
let schoolHeaderTop = schoolHeader.getBoundingClientRect().top + window.pageYOffset;
const headerFixMain = document.querySelector(".header")
const school = document.querySelector(".school")

const btnsScroll = document.querySelectorAll('.school__link');

const contentAboutScrool = document.querySelector('.school__info');
const contentFedbackScrool = document.querySelector('.school__stars');


const contentAbout = document.querySelector('.school__questions');
const contentAllFedback = document.querySelector('.school__reviews ');
const contentWriteFedback = document.querySelector('.school__write');
const contentCourse = document.querySelector('.filters');

let number = 400


let contentAboutScroolTop = contentAboutScrool.getBoundingClientRect().top + window.pageYOffset - schoolHeader.scrollHeight - 20;
let contentFedbackScroolTop = contentFedbackScrool.getBoundingClientRect().top + window.pageYOffset - schoolHeader.scrollHeight - 20;
let contentWriteFedbackScroolTop = contentWriteFedback.getBoundingClientRect().top + window.pageYOffset - schoolHeader.scrollHeight - 20;
let contentCourseScroolTop = contentCourse.getBoundingClientRect().top + window.pageYOffset - schoolHeader.scrollHeight - 20;

btnsScroll[0].addEventListener('click', () => window.scrollTo({
   top: contentAboutScroolTop,
   behavior: 'smooth',
}));
btnsScroll[1].addEventListener('click', () => window.scrollTo({
   top: contentFedbackScroolTop,
   behavior: 'smooth',
}));
btnsScroll[2].addEventListener('click', () => window.scrollTo({
   top: contentWriteFedbackScroolTop,
   behavior: 'smooth',
}));
btnsScroll[3].addEventListener('click', () => window.scrollTo({
   top: contentCourseScroolTop,
   behavior: 'smooth',
}));
schoolbtnScrollTop.addEventListener('click', () => window.scrollTo({
   top: 0,
   behavior: 'smooth',
}));
window.addEventListener('load', () => {
   schoolFixed()
})
window.addEventListener('scroll', schoolFixed, { passive: true })
window.addEventListener('resize', () => {
   schoolHeaderTop = school.offsetTop;
   schoolFixed()
   schoolSmooth()
}, { passive: true })

function schoolFixed() {
   let top = document.documentElement.scrollTop;
   let height = headerFixMain.getBoundingClientRect().height;
   if (top >= schoolHeaderTop - height) {
      headerFixMain.classList.add('__stoped');
      headerFixMain.style.top = schoolHeaderTop - height + 'px';
   } else {
      headerFixMain.classList.remove('__stoped');
      headerFixMain.style.top = '0px';
   }
   if (top >= schoolHeaderTop) {
      schoolHeader.classList.add('lock__padding');
      headerFixMain.classList.remove('__box');
      schoolHeader.nextElementSibling.style.paddingTop = schoolHeader.scrollHeight + 'px'
   } else {
      schoolHeader.classList.remove('lock__padding');
      headerFixMain.classList.remove('__border');
      schoolHeader.nextElementSibling.style.paddingTop = 0
      schoolHeader.style.top = 0;
   }

   if (top >= schoolHeaderTop - height + number) {
      schoolbtnScrollTop.classList.add('__visible');
      schoolFooter.classList.add('__visible');
      body.style.paddingBottom = schoolFooter.scrollHeight + 'px'
   } else {
      body.style.paddingBottom = 0
      schoolbtnScrollTop.classList.remove('__visible');
      schoolFooter.classList.remove('__visible');
   }

   if (schoolHeader.getBoundingClientRect().bottom < contentAbout.getBoundingClientRect().bottom) {
      btnsScroll[0].classList.add('__active')
      btnsScroll[1].classList.remove('__active')
      btnsScroll[3].classList.remove('__active')
   } else if (schoolHeader.getBoundingClientRect().bottom < contentAllFedback.getBoundingClientRect().bottom) {
      btnsScroll[0].classList.remove('__active')
      btnsScroll[1].classList.add('__active')
      btnsScroll[3].classList.remove('__active')
   }
   else if (schoolHeader.getBoundingClientRect().bottom < contentWriteFedback.getBoundingClientRect().bottom) {
      btnsScroll[0].classList.remove('__active')
      btnsScroll[1].classList.remove('__active')
      btnsScroll[3].classList.remove('__active')
   } else if (schoolHeader.getBoundingClientRect().bottom < contentCourse.getBoundingClientRect().bottom) {
      btnsScroll[0].classList.remove('__active')
      btnsScroll[1].classList.remove('__active')
      btnsScroll[3].classList.add('__active')
   }
}
function schoolSmooth() {
   contentAboutScroolTop = contentAboutScrool.getBoundingClientRect().top + window.pageYOffset - schoolHeader.scrollHeight - 20;
   contentFedbackScroolTop = contentFedbackScrool.getBoundingClientRect().top + window.pageYOffset - schoolHeader.scrollHeight - 20;
   contentWriteFedbackScroolTop = contentWriteFedback.getBoundingClientRect().top + window.pageYOffset - schoolHeader.scrollHeight - 20;
   contentCourseScroolTop = contentCourse.getBoundingClientRect().top + window.pageYOffset - schoolHeader.scrollHeight - 20;
}

let comments = document.querySelectorAll(".school__plusAndMinus");
for (const comment of comments) {
   let like = comment.querySelector('.school__like')
   let likeNumber = Number(like.getAttribute('data-number'))
   let dislike = comment.querySelector('.school__dislike')
   let dislikeNumber = Number(dislike.getAttribute('data-number'))

   like.addEventListener('click', () => {
      if (like.classList.toggle('__active')) {
         dislike.classList.remove('__active')
         dislike.lastElementChild.innerText = `Не помогло (${dislikeNumber})`
         like.lastElementChild.innerText = `Помогло (${likeNumber + 1})`
      } else {
         like.lastElementChild.innerText = `Помогло (${likeNumber})`
      }
   })
   dislike.addEventListener('click', () => {
      if (dislike.classList.toggle('__active')) {
         like.classList.remove('__active')
         like.lastElementChild.innerText = `Помогло (${likeNumber})`
         dislike.lastElementChild.innerText = `Не помогло (${dislikeNumber + 1})`
      } else {
         dislike.lastElementChild.innerText = `Не помогло (${dislikeNumber})`
      }
   })
}