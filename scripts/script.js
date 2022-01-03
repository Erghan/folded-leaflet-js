const flyerZone = document.querySelector('#flyerZone')
const flyer = document.querySelector('#flyer')
const conseil = document.querySelector('.conseil')
const voletLeft = document.querySelectorAll('.volet.left')
const voletCenter = document.querySelector('.volet.center')
const voletRight = document.querySelectorAll('.volet.right')

var centerStatus = 0
var leftStatus = 0
var rightStatus = 0

onFocus()
offFocus()
// flyer.style.transform = "rotateX(0deg)"

function conseilDisable() {
    conseil.style.opacity = "0"
    conseil.style.transition = "opacity ease 0.5s"

    setTimeout(() => {
        conseil.style.display = "none"
    }, 500);
}

function onFocus() {
    flyerZone.addEventListener('mouseenter', e => {
        flyer.style.transform = "rotateX(0deg)"
        voletCenter.style.boxShadow = "0 5px 20px 0px rgba(0, 0, 0, 0.7)"
    })
}

function offFocus() {
    flyerZone.addEventListener('mouseleave', e => {

        flyer.style.transform = "rotateX(50deg)"
        voletCenter.style.boxShadow = "0 45px 50px -10px rgba(0, 0, 0, 0.7)"
        centerStatus = 0

        if (leftStatus != 0 || rightStatus != 0) {

            voletLeft.forEach(left => {
                voletRight.forEach(right => {

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
        flyer.style.transform = "rotateY(0deg)"
        voletCenter.style.boxShadow = "0 5px 20px 0px rgba(0, 0, 0, 0.7)"
        centerStatus = 0
    } else {
        flyer.style.transform = "rotateY(180deg)"
        voletCenter.style.boxShadow = "0 0 0 0 rgba(0, 0, 0, 0)"
        centerStatus = 1
    }
}

function moveLeft() {
    voletLeft.forEach(left => {
        voletRight.forEach(right => {

            if (centerStatus == 1) {
                flyer.style.transform = "rotateY(0deg)"
                voletCenter.style.boxShadow = "0 5px 20px 0px rgba(0, 0, 0, 0.7)"
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

    voletLeft.forEach(left => {
        voletRight.forEach(right => {

            if (centerStatus == 1) {
                flyer.style.transform = "rotateY(0deg)"
                voletCenter.style.boxShadow = "0 5px 20px 0px rgba(0, 0, 0, 0.7)"
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