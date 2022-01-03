const body = document.querySelector('body')
const leafletContainer = document.querySelector('#leafletContainer')
const leaflet = document.querySelector('#leaflet')
const advice = document.querySelector('.advice')
const flapLeft = document.querySelectorAll('.flap.left')
const flapCenter = document.querySelector('.flap.center')
const flapRight = document.querySelectorAll('.flap.right')

var centerStatus = 0
var leftStatus = 0
var rightStatus = 0

onFocus()
offFocus()

body.style.overflowY = "hidden"

function adviceDisable() {
    advice.style.opacity = "0"
    advice.style.transition = "opacity ease 0.5s"
    
    setTimeout(() => {
        advice.style.display = "none"
        body.style.overflowY = "auto"
    }, 500);
}

function onFocus() {
    leafletContainer.addEventListener('mouseenter', e => {
        leaflet.style.transform = "rotateX(0deg)"
        flapCenter.style.boxShadow = "0 5px 20px 0px rgba(0, 0, 0, 0.7)"
    })
}

function offFocus() {
    leafletContainer.addEventListener('mouseleave', e => {

        leaflet.style.transform = "rotateX(50deg)"
        flapCenter.style.boxShadow = "0 45px 50px -10px rgba(0, 0, 0, 0.7)"
        centerStatus = 0

        if (leftStatus != 0 || rightStatus != 0) {

            flapLeft.forEach(left => {
                flapRight.forEach(right => {

                    leftStatus = 1.5
                    left.style.transform = "rotateY(-90deg)"

                    setTimeout(() => {
                        right.style.transform = "rotateY(0deg)"

                        right.addEventListener('transitionstart', function () {
                            rightStatus = 1.5
                        })

                        right.addEventListener('transitionend', function () {
                            rightStatus = 0
                        })

                        setTimeout(() => {
                            left.style.transform = "rotateY(0deg)"

                            left.addEventListener('transitionstart', function () {
                                leftStatus = 1.5
                            })

                            left.addEventListener('transitionend', function () {
                                leftStatus = 0
                            })

                        }, 800)
                    }, 300)
                })
            })
        }
    })
}

function moveCenter() {

    if (centerStatus == 1) {
        leaflet.style.transform = "rotateY(0deg)"
        flapCenter.style.boxShadow = "0 5px 20px 0px rgba(0, 0, 0, 0.7)"
        centerStatus = 0
    } else {
        leaflet.style.transform = "rotateY(180deg)"
        flapCenter.style.boxShadow = "0 0 0 0 rgba(0, 0, 0, 0)"
        centerStatus = 1
    }
}

function moveLeft() {
    flapLeft.forEach(left => {
        flapRight.forEach(right => {

            if (centerStatus == 1) {
                leaflet.style.transform = "rotateY(0deg)"
                flapCenter.style.boxShadow = "0 5px 20px 0px rgba(0, 0, 0, 0.7)"
                centerStatus = 0
            }

            if ((leftStatus == 1) && (rightStatus == 1.5)) {

                setTimeout(() => {
                    left.style.transform = "rotateY(0deg)"

                    left.addEventListener('transitionstart', function () {
                        leftStatus = 1.5
                    })

                    left.addEventListener('transitionend', function () {
                        leftStatus = 0
                    })
                }, 300)

            } else if ((leftStatus == 1) || (leftStatus == 0.5)) {

                left.style.transform = "rotateY(0deg)"

                left.addEventListener('transitionstart', function () {
                    leftStatus = 1.5
                })

                left.addEventListener('transitionend', function () {
                    leftStatus = 0
                })

            } else if ((leftStatus == 0) || (leftStatus == 1.5)) {

                left.style.transform = "rotateY(-170deg)"

                left.addEventListener('transitionstart', function () {
                    leftStatus = 0.5
                })

                left.addEventListener('transitionend', function () {
                    leftStatus = 1
                })
            }
        })
    })
}

function moveRight() {

    flapLeft.forEach(left => {
        flapRight.forEach(right => {

            if (centerStatus == 1) {
                leaflet.style.transform = "rotateY(0deg)"
                flapCenter.style.boxShadow = "0 5px 20px 0px rgba(0, 0, 0, 0.7)"
                centerStatus = 0
            }

            if (((rightStatus == 1) || (rightStatus == 0.5)) && ((leftStatus == 0) || (leftStatus == 1.5))) {

                leftStatus = 1.5
                left.style.transform = "rotateY(-90deg)"

                setTimeout(() => {
                    right.style.transform = "rotateY(0deg)"

                    right.addEventListener('transitionstart', function () {
                        rightStatus = 1.5
                    })

                    right.addEventListener('transitionend', function () {
                        rightStatus = 0
                    })

                    setTimeout(() => {
                        left.style.transform = "rotateY(0deg)"

                        left.addEventListener('transitionstart', function () {
                            leftStatus = 1.5
                        })

                        left.addEventListener('transitionend', function () {
                            leftStatus = 0
                        })

                    }, 800);
                }, 300);

            } else if ((rightStatus == 1) || (rightStatus == 0.5)) {

                right.style.transform = "rotateY(0deg)"

                right.addEventListener('transitionstart', function () {
                    rightStatus = 1.5
                })

                right.addEventListener('transitionend', function () {
                    rightStatus = 0
                })

            } else if (((rightStatus == 0) || (rightStatus == 1.5)) && ((leftStatus == 1) || (leftStatus == 0.5))) {

                right.style.transform = "rotateY(170deg)"

                right.addEventListener('transitionstart', function () {
                    rightStatus = 0.5
                })

                right.addEventListener('transitionend', function () {
                    rightStatus = 1
                })
            }
        })
    })
}