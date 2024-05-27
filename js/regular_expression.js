const str = 'front-front';

const reg = /front/

if (reg.test(str)) {
    console.log('pass!');
}

const reg1 = /^front/
const reg2 = /front$/
const reg3 = /^front$/

if (reg1.test(str)) {
    console.log('pass1!');
}

if (reg2.test(str)) {
    console.log('pass2!');
}

if (reg3.test(str)) {
    console.log('pass3!');
}
