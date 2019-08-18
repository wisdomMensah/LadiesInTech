/*Building classes for LIT to make the studying javascript simple
and easier to use
*/

class Image {
    constructor(){
        this.element;
    }

     /*Adding image to the srceen with the help of html */
    getImage(produceImg){
        let imgHolder = document.querySelector('img');
        imgHolder.src = produceImg;
     }

     getImageId(id,produceImg){
        document.getElementById(id).src = produceImg;     
     }

     getImageAll(produceImg){
        const imgHolder = document.querySelectorAll('img');
        imgHolder.src = produceImg;
     }

     imageCreator(){
        const imgHolder = document.createElement('img');
    }
    imgListenToEvent(event,userFunction){
        const image = document.querySelector("img")
        image.addEventListener(event,userFunction);
        
    }
}

class elementGenerator {
    constructor(){
        this.element;
    }

    // producing an element 
    generateElement(produceElement, userInput){
        const elementHolder = document.createElement(produceElement);
        elementHolder.textContent = "" + userInput;
        return produceElement;
    }

    appender(element, appendize){
        const container = document.querySelector(element);
        container.innerHTML = "";
        container.appendChild(appendize); 
    }


}


function openPresent(event) {
    const header1 = new elementGenerator();
    header1.generateElement('h1',"horray!");

    const img = new Image();
    img.imageCreator();
    img.getImage("img/orchard.jpg");

}

const img = new Image();
img.getImage("img/header.jpg")
img.imgListenToEvent("click",openPresent);




/*Building a class for button */

// class Button {
//     constructor(){
//         this.element;
//     }

//      /*Adding image to the srceen with the help of html */
//     getButton(produceImg){
//         const imgHolder = document.querySelector('img');
//         imgHolder.src = produceImg;
//      }

//      getButton(id,produceImg){
//         document.getElementById(id).src = produceImg;     
//      }

//      getImageAll(produceImg){
//         const imgHolder = document.querySelectorAll('img');
//         imgHolder.src = produceImg;
//      }
// }


// function openPresent(event) {
//     img = event.currentTarget;
//     img = new Image(); 
//     img.getImage("img/orchard.jpg");
//     img.removeEventListener("click",openPresent);
// }
// const img2 = new Image();
// // img2.getImage("img/howard.jpeg");
// img2.addEventListener('click',openPresent);
// img2.getImage("img/orchard.jpg"); 

// // img.getImageAll("img/header.jpg")






// // static methods
// // hasClass method
// xObject.hasClass = function(el, value) {
//     return (" " + el.className + " ").indexOf(" " + value + " ") > -1;
// };

// //adds a class 
// xObject.addClass = function(el, value) {
//     let className = el.className;

//     if(!className) {
//         el.className = value;
//     } else {
//         classNames = value.split(/\s+/),
//         l = className.length;


//         for(let i = 0; i < l; i++) {
//             if(!this.hasClass(el, classNames[i])) {
//                 className += " " + classNames[i];
//             }
//         }
//         el.className = className.trim();
//     }
// };







// // removes a class
// xObject.removeClass = function(el, value) {
//     if(value) {
//          classNames = value.split(/\s+/),
//          className = " " + el.className + " ",
//          l = className.length;
//          for(let i = 0; i < l; i++) {
//              className = className.replace(" " + classNames[i] + " ", " ");
//          }
//          el.className = className.trim();
//     } else {
//         el.className = "";
//     }
// };


// //toggle a class
// xObject.toggleClass = function(el, value) {
//     className = value.split(/\s+/),
//     i = 0,
//     className;

//     while(className === classNames[i++]) {
//         if(this,this.hasClass(le,className)){
//             this.removeClass(el,className);
//         }else {
//             this.addClass(el,className);
//         }
//     }
// };


// // addClass prototype
// xObject.prototype.addClass = function(value) {
//     xObject.addClass(this.el, value);
//     return this;
// };

// // removeClass prototype
// xObject.prototype.removeClass = function(value) {
//     xObject.removeClass(this.el, value);
//     return this;
// };

// // toggleClass prototype
// xObject.prototype.toggleClass = function(value) {
//     xObject.toggleClass(this.el, value);
//     return this;
// };

// //hasClass prototype
// xObject.prototype.hasClass = function(value) {
//     return xObject.hasClass(this.el, value);
// }



