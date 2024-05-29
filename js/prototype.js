// so abstract

// why prototype? for inheritation

Object.prototype === Object

function Person() { }
Person.prototype instanceof Object

Person.__proto__ === Function.prototype

function Man() { }
Man.prototype = new Person() //extends
