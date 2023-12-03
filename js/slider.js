const entities = [
    {
      city: 'Rostov-on-Don <br> LCD admiral',
      apartmentArea: '81 m<sup>2</sup>',
      repairTime: '3.5 months',
      repairCost: 'Upon request',
      img: 'images/jpeg/projects-img.jpg',
      imgMobile: 'images/jpeg/projects-img.jpg'
    },
    {
      city: 'Sochi <br> Thieves',
      apartmentArea: '105 m<sup>2</sup>',
      repairTime: '4 months',
      repairCost: 'Upon request',
      img: 'images/jpeg/projects-img2.jpg',
      imgMobile: 'images/jpeg/projects-img2.jpg'
    },
    {
      city: 'Rostov-on-Don <br> Patriotic',
      apartmentArea: '93 m<sup>2</sup>',
      repairTime: '3 months',
      repairCost: 'Upon request',
      img: 'images/jpeg/projects-img3.jpg',
      imgMobile: 'images/jpeg/projects-img3.jpg'
    }
]

const textCity = document.querySelector('.projects__data-text_entity_city')
const textApartmentArea = document.querySelector('.projects__data-text_entity_area')
const textRepairTime = document.querySelector('.projects__data-text_entity_time')
const textRepairCost = document.querySelector('.projects__data-text_entity_cost')
const img = document.querySelector('.projects__img-block')
const imgMobile = document.querySelector('.projects__img-photo-mobile')
const photo = document.querySelector('.projects__img-photo')

const setEntity = (index) => {
    textCity.innerHTML = entities[index].city
    textApartmentArea.innerHTML = entities[index].apartmentArea
    textRepairTime.innerHTML = entities[index].repairTime
    textRepairCost.innerHTML = entities[index].repairCost
    img.innerHTML = `<img class="projects__img-photo" src="${entities[index].img}" alt="Photo">`
    imgMobile.src=`${entities[index].img}`
}

const prev = document.querySelector('.projects__selection-arrow-btn_direction_left')
const next = document.querySelector('.projects__selection-arrow-btn_direction_right')
const btnList = document.querySelectorAll('.projects__list-btn')
const btnCircle = document.querySelectorAll('.projects__selection-circle-btn')
const cssBtnList = 'projects__list-btn-hover'
const cssBtnCircle = 'projects__selection-circle-btn-focus'
const prevMobile = document.querySelector('.projects__mobile-btn_direction_left')
const nextMobile = document.querySelector('.projects__mobile-btn_direction_right')
let currentIndex = 0

//---------------------------------ARROW-BUTTONS---------------------------------------------------

prev.addEventListener('click', () => {
    if (currentIndex === 0) {
        currentIndex = entities.length
    }
    setEntity(currentIndex -= 1);
    for (let i = 0; i < btnList.length; i = i + 1) {
        btnList[i].classList.remove(cssBtnList)
        btnCircle[i].classList.remove(cssBtnCircle)
    }
    btnList[currentIndex].classList.add(cssBtnList)
    btnCircle[currentIndex].classList.add(cssBtnCircle)
})
next.addEventListener('click', () => {
    if (currentIndex === entities.length - 1) {
        currentIndex = -1
    }
    setEntity(currentIndex += 1);
    for (let i = 0; i < btnList.length; i = i + 1) {
        btnList[i].classList.remove(cssBtnList)
        btnCircle[i].classList.remove(cssBtnCircle)
    }
    btnList[currentIndex].classList.add(cssBtnList)
    btnCircle[currentIndex].classList.add(cssBtnCircle)
})

//---------------------------------CIRCLE-AND-WORD-BUTTONS-----------------------------------------

function btnSwitch() {
    btnList.forEach((element, num) => {
        element.addEventListener('click', () => {
            setEntity(num);
            for (let i = 0; i < btnList.length; i = i + 1) {
                btnList[i].classList.remove(cssBtnList)
                btnCircle[i].classList.remove(cssBtnCircle)
            }
            btnList[num].classList.add(cssBtnList)
            btnCircle[num].classList.add(cssBtnCircle)
            currentIndex = num
        })
    });
}

function circleSwitch() {
    btnCircle.forEach((element, num) => {
        element.addEventListener('click', () => {
            setEntity(num);
            for (let i = 0; i < btnCircle.length; i = i + 1) {
                btnCircle[i].classList.remove(cssBtnCircle)
                btnList[i].classList.remove(cssBtnList)
            }
            btnCircle[num].classList.add(cssBtnCircle)
            btnList[num].classList.add(cssBtnList)
            currentIndex = num
        })
    });
}

//-------------------------------------MOBILE-BUTTONS----------------------------------------------

prevMobile.addEventListener('click', () => {
    if (currentIndex === 0) {
        currentIndex = entities.length
    }
    setEntity(currentIndex -= 1);
    for (let i = 0; i < btnList.length; i = i + 1) {
        btnList[i].classList.remove(cssBtnList)
        btnCircle[i].classList.remove(cssBtnCircle)
    }
    btnList[currentIndex].classList.add(cssBtnList)
    btnCircle[currentIndex].classList.add(cssBtnCircle)
})
nextMobile.addEventListener('click', () => {
    if (currentIndex === entities.length - 1) {
        currentIndex = -1
    }
    setEntity(currentIndex += 1);
    for (let i = 0; i < btnList.length; i = i + 1) {
        btnList[i].classList.remove(cssBtnList)
        btnCircle[i].classList.remove(cssBtnCircle)
    }
    btnList[currentIndex].classList.add(cssBtnList)
    btnCircle[currentIndex].classList.add(cssBtnCircle)
})

//-------------------------------SELECTING-THE-FIRST-POSITION--------------------------------------

function startPosition() {
    for (let i = 0; i < entities.length; i = i + 1) {
        if (entities[i].img === photo.getAttribute('src')) {
            btnList[i].classList.add(cssBtnList)
            btnCircle[i].classList.add(cssBtnCircle)
        }
    }
}

//-------------------------------------------------------------------------------------------------

btnSwitch()
circleSwitch()
startPosition()

