const field = new Image()
const scoreField = new Image()
field.src = 'img/field.jpg'
scoreField.src = 'img/score_field.jpg'


function digit2image(digit) {
    let res
    switch(digit){
        case 2 : res = 'img/d2.jpg'; break
        case 4 : res = 'img/d4.jpg'; break
        case 8 : res = 'img/d8.jpg'; break
        case 16 : res = 'img/d16.jpg'; break
        case 32 : res = 'img/d32.jpg'; break
        case 64 : res = 'img/d64.jpg'; break
        case 128 : res = 'img/d128.jpg'; break
        case 256 : res = 'img/d256.jpg'; break
        case 1024 : res = 'img/d1024.jpg'; break
        case 2048 : res = 'img/d2048.jpg'; break
      }
    return res
}