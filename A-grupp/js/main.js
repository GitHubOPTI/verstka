// Служебные переменные
const d = document;
const body = d.querySelector('body');

// Служебные функции

function find(selector) {
    return document.querySelector(selector)
}

function findAll(selectors) {
    return document.querySelectorAll(selectors)
}

// Удаляет у всех элементов items класс itemClass
function removeAll(items, itemClass) {
    if (typeof items == 'string') {
        items = document.querySelectorAll(items)
    }
    for (let i = 0; i < items.length; i++) {
        const item = items[i]
        item.classList.remove(itemClass)
    }
}

function bodyLock(con) {
    if (con === true) {
        body.classList.add('_lock');
    } else if (con === false) {
        body.classList.remove('_lock');
    } else if (con === undefined) {
        if (!body.classList.contains('_lock')) {
            body.classList.add('_lock');
        } else {
            body.classList.remove('_lock')
        }
    } else {
        console.error('Неопределенный аргумент у функции bodyLock()')
    }
}

// Валидация формы
// function validationForm() {
//     const name = find('#user_name')
//     const phone = find('#user_phone')
//     const email = find('#user_email')

//     let con = true

//     for (let i = 0; i < [name, phone, email].length; i++) {
//         const elem = [name, phone, email][i];
//         const elemValue = elem.value.trim()

//         if (elemValue === '') {
//             elem.classList.add('_error')
//             con = false
//         } else {
//             elem.classList.remove('_error')
//             con = true
//         }
//     }

//     return con
// }

// Отправка формы
// sumbitForm()
// function sumbitForm() {
//     const form = find('.modal__form')

//     form.addEventListener('submit', async e => {
//         const modal = find('.modal._show')
//         const btnSend = form.querySelector('[type=submit]')
//         btnSend.classList.add('send-preloader')

//         e.preventDefault()

//         let con = validationForm()

//         if (con === true) {
//             const formData = new FormData()
//             const action = form.getAttribute('action')

//             let response = await fetch(action, {
//                 method: 'POST',
//                 body: formData
//             })

//             // settimeout здесь для того, чтобы показать работу отправки формы. В дальнейшем это нужно убрать
//             setTimeout(() => {
//                 if (response.ok) {
//                     console.log('Successful')
//                     form.reset()

//                     modal.classList.remove('_show')
//                     find('#send-done').classList.add('_show')
//                     btnSend.classList.remove('send-preloader')
//                 }
//                 else {
//                     console.log('Error')
//                     form.reset()

//                     modal.classList.remove('_show')
//                     find('#send-error').classList.add('_show')
//                     btnSend.classList.remove('send-preloader')
//                 }
//             }, 2000)

//         }
//     })
// }

// Мобильное меню
// menu()
function menu() {
    const burger = find('.burger')
    const menu = find('.menu');

    // Высота меню
    window.addEventListener('resize', () => {
        const headerHeight = find('.header').clientHeight

        if (window.innerWidth <= 768) {
            menu.style.paddingTop = headerHeight + 'px'
        } else {
            menu.style.paddingTop = 0
        }
    })

    burger.addEventListener('click', (e) => {
        burger.classList.toggle('burger_close')
        menu.classList.toggle('_show')
        bodyLock()
    })
}

const advantagesSlider = new Swiper('.main-slider__container', {
    spaceBetween: 0,
    loop: true,

    navigation: {
        nextEl: '.main-slider .main-slider__arrow-next',
        prevEl: '.main-slider .main-slider__arrow-prev',
    },

    pagination: {
        el: '.main-slider .main-slider__pagination',
    },
});


const yearSlider = new Swiper('.photo-section__slider .swiper', {
    spaceBetween: 0,
    slidesPerView: 7,


    navigation: {
        nextEl: '.photo-section__slider .main-slider__arrow-next',
        prevEl: '.photo-section__slider .main-slider__arrow-prev',
    },

    pagination: {
        el: '.photo-section__slider .main-slider__pagination',
    },
});


// Табы
if (find('.tab')) tabsComponents()

function tabsComponents() {
    const tab = find('.tab')
    const tabHeader = tab.querySelector('.tab-header')
    const tabBody = tab.querySelector('.tab-body')
    const tabElems = tabHeader.querySelectorAll('[data-tab-head]')
    const totalTabItemElems = tabBody.querySelectorAll('[data-tab-item]')

    for (let i = 0; i < tabElems.length; i++) {
        const tab = tabElems[i];

        tab.addEventListener('click', () => {
            const dataAttr = tab.dataset.tabHead
            const tabItemElems = (dataAttr === 'all') ? tabBody.querySelectorAll(`[data-tab-item]`) : tabBody.querySelectorAll(`[data-tab-item="${dataAttr}"]`)

            removeAll(totalTabItemElems, '_show')

            removeAll(tabElems, '_active')
            tab.classList.add('_active')

            for (let i = 0; i < tabItemElems.length; i++) {
                const tabItem = tabItemElems[i];

                tabItem.classList.add('_show')

                if (tabItem.classList.contains('employee-card_best')) {
                    const numCards = tabItemElems.length - 3

                    if (i >= numCards) {
                        tabItem.classList.add('_popup-top')
                    }
                }
            }
        })
    }
}

// Позиционирование карточек в контейнере списка карточек faq
// cardFAQ()
// function cardFAQ() {
//     const container = find('.faq-section__list')
//     const cardElems = findAll('.faq-section__card')
//     let countColumn = 2 // кол-во колонок
//     const gapColumn = 20 // отступ между колонками
//     const gapRow = 10 // отступ между строками
//     const countCard = cardElems.length // кол-во карточек

//     if (window.innerWidth < 768) countColumn = 1
//     console.log(window.innerWidth)
//     window.addEventListener('resize', e => {
//         if (window.innerWidth < 768) countColumn = 1
//         widthCardFAQ()
//         positionCardFAQ()
//     })

//     widthCardFAQ()
//     function widthCardFAQ() {
//         // Ширина карточек
//         const containerWidth = container.offsetWidth
//         const cardWidth = containerWidth / countColumn - gapColumn / 2

//         for (let i = 0; i < cardElems.length; i++) {
//             const card = cardElems[i];
//             card.style.width = cardWidth + 'px'
//         }
//     }

// positionCardFAQ()
// function positionCardFAQ() {
//     // console.log('ok')
//     // Позиционирование карточек
//     let r = 0 // номер строки, начиная с нуля

//     for (let i = 0; i < cardElems.length; i++) {
//         const card = cardElems[i];
//         const cardHeight = card.offsetHeight
//         const cardTop = (i === 0 || i === 1) ? 0 : cardHeight + gapRow // Если итерируется первая или вторая карточка, то для них значение top = 0, у остальных cardTop равен высоте одной карточки умноженной на оступ между ними. Далее это значение будет увеличиваться в n-раз в зависимости от того, какая сейчас строка

//         // Если это первая строка
//         if (r === 0) {
//             card.style.top = cardTop + 'px'
//         }
//         // В остальных случаях
//         else {
//             card.style.top = cardTop * r + 'px'
//         }

//         // При итерации каждой второй карточки
//         if ((i+1)%2 === 0) {
//             card.style.right = 0 
//             r++ // увеличивается номер строки на 1
//         }
//     }
// }

// Размер списка с карточками с частозадаваемыми вопросами
// container.style.height = countCard / countColumn + 'px'
// }

// Размер списка с карточками с частозадаваемыми вопросами
// sizeContainerFAQ()
// function sizeContainerFAQ() {
//     const container = find('.faq-section__list')
//     const cardElems = findAll('.faq-section__card')


// }

// positionCardFAQ()
// function positionCardFAQ() {
//     const container = find('.faq-section__list')
//     const cardElems = findAll('.faq-section__card')
//     const countColumn = 1 // кол-во колонок
//     const gapColumn = 20 // отступ между колонками
//     const gapRow = 10 // отступ между строками

//     // Ширина карточек
//     const containerWidth = container.offsetWidth
//     const cardWidth = containerWidth / countColumn - gapColumn / 2

//     for (let i = 0; i < cardElems.length; i++) {
//         const card = cardElems[i];
//         card.style.width = cardWidth + 'px'
//     }

//     // Позиционирование карточек
//     let r = 0 // номер строки, начиная с нуля
//     let n = 0 // номер карточки в каждой строке. Равно нулю при переходе на другую строку

//     for (let i = 0; i < cardElems.length; i++) {
//         const card = cardElems[i];
//         const cardHeight = card.offsetHeight
//         const cardTop = (i+1 <= countColumn) ? 0 : cardHeight + gapRow // Если итерируется первая или вторая карточка, то для них значение top = 0, у остальных cardTop равен высоте одной карточки умноженной на оступ между ними. Далее это значение будет увеличиваться в n-раз в зависимости от того, какая сейчас строка
//         // console.log(i+1, countColumn)
//         // Если это первая строка
//         if (r === 0) {
//             card.style.top = cardTop + 'px'
//             // console.log(card)
//         }
//         // В остальных случаях
//         else {
//             card.style.top = cardTop * r + 'px'
//         }
//         // console.log(324*0)
//         // console.log(n)
//         card.style.left = (cardWidth * n) + ((countColumn - 1) * n * gapColumn / 2) + 'px'
//         // if ((i+1)%(n+1+r) === 0) {
//         //     console.log((cardWidth * n) + ((countColumn - 1) * n) + 'px', card, i, n, r)
//         // }

//         n++

//         // При итерации последней карточки в каждой строке
//         if ((i+1)%countColumn === 0) {
//             // card.style.left = cardWidth + 
//             r++ // увеличивается номер строки на 1
//             n = 0 // обнуляем номер карточки
//         }
//     }
// }

// аккордеоны в faq
// accFAQ()
// function accFAQ() {
//     const accElems = findAll('.acc')
//     // console.log('acc')

//     for (let i = 0; i < accElems.length; i++) {
//         const acc = accElems[i];

//         const accHeader = acc.querySelector('.acc-header')
//         const accBody = acc.querySelector('.acc-body')
//         const parent = acc

//         // console.log(accBody.offsetHeight, accBody.clientHeight, accBody.scrollHeight)
//         // const box = find('#box')
//         // console.log(box.scrollHeight)

//         accHeader.addEventListener('click', e => {

//             parent.classList.toggle('_show')
//             if (parent.classList.contains('_show')) {
//                 accBody.style.maxHeight = accBody.scrollHeight + 'px'

//             }
//             else {
//                 accBody.style.maxHeight = '0px'
//             }

//             if (parent.closest('.acc')) {
//                 const closestAcc = parent.closest('.acc')
//                 const closestAccBody = closestAcc.querySelector('.acc-body')
//                 closestAccBody.style.maxHeight = closestAccBody.scrollHeight + 'px'
//                 console.log(parent.closest('.acc'))

//             }
//         })
//     }
// }

accFAQ()

function accFAQ() {
    const accElems = document.querySelectorAll('.acc-header')

    for (let i = 0; i < accElems.length; i++) {

        accElems[i].addEventListener("click", function() {
            this.parentElement.classList.toggle("_show")
            var parent = this.parentElement.parentElement
            var panel = this.nextElementSibling

            if (panel.style.maxHeight) {
                panel.style.maxHeight = null
            } else {
                const adjacentElems = getSiblings(panel.parentElement)
                for (let i = 0; i < adjacentElems.length; i++) {
                    const elem = adjacentElems[i];
                    const elemPanel = elem.querySelector('.acc-body')

                    elem.classList.remove('_show')
                    elemPanel.style.maxHeight = null
                }
                panel.style.maxHeight = panel.scrollHeight + 25 + "px"
                parent.style.maxHeight = parseInt(parent.style.maxHeight) + 25 + panel.scrollHeight + "px"
            }
        })
    }
}

// Получаем все соседние элементы
function getSiblings(elem) {
    var siblings = [];
    var sibling = elem;
    while (sibling.previousSibling) {
        sibling = sibling.previousSibling;
        sibling.nodeType == 1 && siblings.push(sibling);
    }

    sibling = elem;
    while (sibling.nextSibling) {
        sibling = sibling.nextSibling;
        sibling.nodeType == 1 && siblings.push(sibling);
    }

    return siblings;
}


// Функции для модальных окон
modal()

function modal() {
    // Открытие модального окна, если в url указан его id
    openModalHash()

    function openModalHash() {
        if (window.location.hash) {
            const hash = window.location.hash.substring(1)
            const modal = document.querySelector(`.modal#${hash}`)

            if (modal) {
                modal.classList.add('_show');
                bodyLock(true)
                closeWhenClickingOnBg(`#${hash} .modal__content`, modal);
            }
        }
    }

    // Проверка изменения хеша в адресной строке и открытие модалки с id равным этому хешу
    checkHash()

    function checkHash() {
        window.addEventListener("hashchange", e => {
            if (window.location.hash) {
                const hash = window.location.hash.substring(1)
                const modal = document.querySelector(`.modal#${hash}`)

                if (modal) {
                    if (find('.modal._show')) find('.modal._show').classList.remove('_show')
                    modal.classList.add('_show');
                    bodyLock(true)
                    closeWhenClickingOnBg(`#${hash} .modal__content`, modal);
                }
            } else {
                if (find('.modal._show')) find('.modal._show').classList.remove('_show')
            }
        });
    }

    // Закрытие модальных окон при клике по крестику
    closeModalWhenClickingOnCross()

    function closeModalWhenClickingOnCross() {
        const modalElems = document.querySelectorAll('.modal')
        for (let i = 0; i < modalElems.length; i++) {
            const modal = modalElems[i];
            const closeThisModal = modal.querySelector('.modal__close')

            closeThisModal.addEventListener('click', () => {
                modal.classList.remove('_show')
                bodyLock(false)
                resetHash()
            })
        }
    }

    // Закрытие модальных окон при нажатии по клавише ESC
    closeModalWhenClickingOnESC()

    function closeModalWhenClickingOnESC() {
        const modalElems = document.querySelectorAll('.modal')
        for (let i = 0; i < modalElems.length; i++) {
            const modal = modalElems[i];

            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    modal.classList.remove('_show')
                    bodyLock(false)
                    resetHash()
                }
            })
        }
    }

    // Сброс id модального окна в url
    function resetHash() {
        const windowTop = window.pageYOffset
        window.location.hash = ''
        window.scrollTo(0, windowTop)
    }

    // Открытие модальных окон
    openModal()

    function openModal() {
        const btnsOpenModal = document.querySelectorAll('[data-modal-open]');

        for (let i = 0; i < btnsOpenModal.length; i++) {
            const btn = btnsOpenModal[i];

            btn.addEventListener('click', (e) => {
                const dataBtn = btn.dataset.modalOpen;
                const modalThatOpens = document.querySelector(`#${dataBtn}`)

                btn.classList.add('modal-show');
                modalThatOpens.classList.add('_show');
                bodyLock(true)
                closeWhenClickingOnBg(`#${dataBtn} .modal__content`, modalThatOpens);
                window.location.hash = dataBtn
            });
        }
    }

    // Закрытие модального окна при клике по заднему фону
    function closeWhenClickingOnBg(itemArray, itemParent, classShow = '_show') {
        document.addEventListener('click', (e) => {
            let itemElems = document.querySelectorAll(itemArray)

            for (let i = 0; i < itemElems.length; i++) {
                const item = itemElems[i];

                const target = e.target,
                    itsItem = target == item || item.contains(target),
                    itemIsShow = item.classList.contains(classShow);

                if (itemParent) {
                    const itsItemParent = target == itemParent || itemParent.contains(target),
                        itemParentIsShow = itemParent.classList.contains(classShow);

                    if (!itsItem && itsItemParent && itemParentIsShow) {
                        itemParent.classList.remove(classShow);

                        if (body.classList.contains('_lock')) {
                            bodyLock(false)
                        }

                        if (window.location.hash === '#' + itemParent.getAttribute('id')) {
                            resetHash()
                        }
                    }
                } else {
                    if (!itsItem && itemIsShow) {
                        item.classList.remove(classShow);
                        if (body.classList.contains('_lock')) {
                            bodyLock(false)
                        }

                        if (window.location.hash === '#' + itemParent.getAttribute('id')) {
                            resetHash()
                        }
                    }
                }
            }
        })
    }
}

// Страница фотогалерея, переключение вкладок //
document.querySelectorAll('.photo-section__wrapper-menu li').forEach(i => {
    i.addEventListener('click', e => {
        document.querySelectorAll('.photo-section__wrapper.active .photo-section__wrapper-menu li').forEach(el => {
            el.classList.remove('active');
        });
        i.classList.add('active');
        document.querySelectorAll('.photo-section__wrapper.active .photo-section__wrapper-list_photo').forEach(el => {
            el.classList.remove('active');
        });
        document.querySelector(`.photo-section__wrapper.active .photo-section__wrapper-list_photo[data-photo="${i.getAttribute("data-photo")}"]`).classList.add('active');
    });
});


document.querySelectorAll('.photo-section__slider .swiper-slide').forEach(i => {
    i.addEventListener('click', e => {
        document.querySelector('.photo-section__slider .swiper-slide.active').classList.remove('active');
        i.classList.add('active');
        document.querySelector('.photo-section__wrapper.active').classList.remove('active');
        document.querySelector(`.photo-section__wrapper[data-parent-year="${i.getAttribute('data-year')}"`).classList.add('active');
    });
});


// Страница фотогалерея, переключение вкладок //


document.querySelectorAll('.lightgallery').forEach(i => {
    lightGallery(i, {
        thumbnail: true,
    });
});


let textarea_deligation = document.querySelector('.professional-view');
if (textarea_deligation) {
    textarea_deligation.addEventListener('input', function(e) {
        if (this.getElementsByTagName('textarea')) {
            if (e.target.value === '') {
                e.target.style = null;
            } else {
                e.target.style.height = e.target.scrollHeight + "px";
            }
        }
    });
}


if (document.querySelector('#modal-birthdays')) {
    if (document.querySelector('#modal-birthdays .block-border__section').childElementCount > 2) {
        document.querySelector('#modal-birthdays .block-border').classList.add('big-list');
    }
}




let previous = document.querySelector('.sounds__pre');
let play = document.querySelector('.sounds_section__play');
let slider = document.querySelector('.sounds_section__duration_slider') || '';
let next = document.querySelector('.sounds__next');
//let title = document.querySelector('.sounds__title');
let recent_volume = document.querySelector('.sounds__volume');
let volume_show = document.querySelector('.sounds__volume_show');

let show_duration = document.querySelector('.sounds__show_duration');
let track_image = document.querySelector('.sounds__track_image');
let auto_play = document.querySelector('.sounds__auto');
let present = document.querySelector('.sounds__present');
let total = document.querySelector('.sounds__total');
let artist = document.querySelector('.sounds__artist');



let timer;
let autoplay = 0;

let index_no = 0;
let Playing_song = false;

//create a audio Element
let track = document.createElement('audio');


//All songs list
let All_song = [{
        name: "first song",
        path: "music/sample-1.mp3",
        img: "./img/main-slider/1.jpg",
        singer: "1"
    },
    {
        name: "second song",
        path: "music/sample-2.mp3",
        img: "./img/main-slider/1.jpg",
        singer: "2"
    },
    {
        name: "third song",
        path: "music/sample-3.mp3",
        img: "./img/main-slider/1.jpg",
        singer: "3"
    },

];


// All functions


// function load the track
function load_track(index_no) {
    clearInterval(timer);
    reset_slider();

    track.src = All_song[index_no].path;
    // title.innerHTML = All_song[index_no].name;
    // track_image.src = All_song[index_no].img;
    // artist.innerHTML = All_song[index_no].singer;
    track.load();

    timer = setInterval(range_slider, 1000);
    // total.innerHTML = All_song.length;
    //  present.innerHTML = index_no + 1;
}

load_track(index_no);


//mute sound function
function mute_sound() {
    track.volume = 0;
    volume.value = 0;
    volume_show.innerHTML = 0;
}


// checking.. the song is playing or not
function justplay() {
    if (Playing_song == false) {
        playsong();

    } else {
        pausesong();
    }
}


// reset song slider
function reset_slider() {
    slider.value = 0;
}

// play song
function playsong() {
    track.play();
    Playing_song = true;
    play.innerHTML = '<img src="./img/sounds/pause.png">';
}

//pause song
function pausesong() {
    track.pause();
    Playing_song = false;
    play.innerHTML = '<img src="./img/sounds/play.png">';
}


// next song
// function next_song() {
//     if (index_no < All_song.length - 1) {
//         index_no += 1;
//         load_track(index_no);
//         playsong();
//     } else {
//         index_no = 0;
//         load_track(index_no);
//         playsong();

//     }
// }


// // previous song
// function previous_song() {
//     if (index_no > 0) {
//         index_no -= 1;
//         load_track(index_no);
//         playsong();

//     } else {
//         index_no = All_song.length;
//         load_track(index_no);
//         playsong();
//     }
// }


// change volume
// function volume_change() {
//     volume_show.innerHTML = recent_volume.value;
//     track.volume = recent_volume.value / 100;
// }

// change slider position 
function change_duration() {
    slider_position = track.duration * (slider.value / 100);
    track.currentTime = slider_position;
}

// autoplay function
// function autoplay_switch() {
//     if (autoplay == 1) {
//         autoplay = 0;
//         auto_play.style.background = "rgba(255,255,255,0.2)";
//     } else {
//         autoplay = 1;
//         auto_play.style.background = "#FF8A65";
//     }
// }


function range_slider() {
    let position = 0;

    // update slider position
    if (!isNaN(track.duration)) {
        position = track.currentTime * (100 / track.duration);
        slider.value = position;
    }


    // function will run when the song is over
    if (track.ended) {
        play.innerHTML = '<img src="./img/sounds/play.png">';
        if (autoplay == 1) {
            index_no += 1;
            load_track(index_no);
            playsong();
        }
    }
}

const containerMenu = find('.structure-menu__container');
if (containerMenu) {
    const countElementMenu = containerMenu.childElementCount;
    containerMenu.setAttribute('data-counter', countElementMenu);
}