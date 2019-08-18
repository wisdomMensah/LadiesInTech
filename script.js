/*Creating a library that would reduce the complications
  of the syntax in javascript for beginners in OOP in javascript
  This library is mainly meant for people who are new to OOP
  After few weeks of studies with the library, then the student 
  is ready to learn the abtractions. 
*/


/**
 * NOTE: The "instance methods" use the "static methods" but is related to the
 * xObject. Think of it as a shortcut of using "static methods" for an 
 * object.
 * Nevertheless you can use the static methods without calling xObject
 * a functionality.
 */

    /** Objects **/
    function xObject(obj) {

    /*prevents the client to repeatedly type " new object_name*/
    //this piece never works (buggy... maybe the javascript version or something)
    if(this === window){
        return new xObject;
    }

    /*Check if the user pass a string or object as a parameter*/
    let type = typeof obj;
    if(typeof obj === "string") {
        this.el = document.getElementById(obj);
    }else if(type === "object" && obj.nodeType !== "undefined" && obj.nodeType === 1){
        this.el = obj;
    }else{
        throw new Error("Argument is of wrong type");
    }
    this._css = this.el.style;

}


/** Event  instance methods  for addEvent and removeEvent respectively**/
xObject.prototype.addEvent = function(evt, fn){
    xObject.addEvent(this.el, evt, fn);

    return this;
};
    

xObject.prototype.removeEvent = function(evt, fn){
    xObject.removeEvent(this.el, evt, fn);
    return this; 
};


////instance function for click but can use the "addEvent static method" to 
// achieve similar functionality
xObject.prototype.click = function(fn){
    let that = this;
    xObject.addEvent(this.el, "click" , function(e){
        fn.call(that,e);
    });

    return this;
};


//instance function for mouseout but can use the "addEvent static method" to 
// achieve similar functionality
xObject.prototype.mouseout = function(fn){
    let that = this;
    xObject.addEvent(this.el, "mouseout" , function(e){
        fn.call(that,e);
    });

    return this;
};

////instance function for mouseover but can use the "addEvent static method" to 
// achieve similar functionality
xObject.prototype.mouseover = function(fn){
    let that = this;
    xObject.addEvent(this.el, "mouseover" , function(e){
        fn.call(that,e);
    });

    return this;
};



// imageFunction
/** the image function adds an image by taking id or obj 
 * and its implementations are as follow, eg:  imageFunction("user","img/header.jpg");
 * using static method
 **/


// tried a static image for "classes" but having trouble implementing it (buggy...)
xObject.classImageFunction= function(elm, produceImg) {
    if(typeof elm === "string") {
        this.imgHolder = document.getElementsByClassName(elm);
        this.imgHolder.src = produceImg;
        
     }else if(typeof elm === "object" && elm.innerHTML !== "undefined"){
             this.imgHolder = document.getElementsByClassName(elm);
             this.imgHolder.src = produceImg;
        }else{
        throw new Error("Argument is of wrong type");
    }
    return this;
}

//putting an image directly (for id)
xObject.putImage = function(elm, produceImg){
    document.getElementById(elm).src = produceImg;
}


//a static method for inserting an image for an id
xObject.idImageFunction= function(elm, produceImg){
    if(typeof elm === "string") {
        this.imgHolder = document.getElementById(elm);
        this.imgHolder.src = produceImg;
        
     }else if(typeof elm === "object" && elm.innerHTML !== "undefined"){
             this.imgHolder = document.getElementById(elm);
             this.imgHolder.src = produceImg;
        }else{
        throw new Error("Argument is of wrong type");
    }
    return this;
}






/** Event  static methods **/
// this methods adds an EventListener, removes an EventListener even for IE
if(typeof addEventListener !== "undefined"){
    xObject.addEvent = function(obj, evt, fn) {
        obj.addEventListener(evt, fn, false);
    };

    xObject.removeEvent = function(obj, evt, fn) {
        obj.removeEventListener(evt, fn, false);
    };
}else if(typeof attachEvent !== "undefined"){
    xObject.addEvent = function(obj, evt, fn) {

        let fnHash = "e_" + + fn;
        obj[fnHash] = function() {
            let type = event.type,
            relatedTarget = null;

            if(type === "mouseover" || type === "mouseout") {
                relatedTarget = (type === "mouseover" ) ? event.fromElement : event.toElement;
            }
            
            fn.call(obj, {
                target : event.srcElement,
                type: type,
                relatedTarget : relatedTarget,
                _event : event,
                preventDefault : function() {
                    this._event.returnValue = false;
                },
                stopPropagation : function() {
                    this._event.returnValue = true;
                }
            });
        };
        obj.attachEvent("on" + evt , obj[fnHash]);

        obj.removeEvent = function(obj , evt, fn){
            let fnHash = "e_" + evt +fn;

            if(typeof obj[fnHash] !== "undefined"){
                obj.detachEvent("on" + evt , obj[fnHash]);
                delete obj[fnHash];
            }
        }
    };
}else{
    xObject.addEvent = function(obj, evt, fn) {
        obj["on" + evt] = fn;
        };  

    xObject.removeEvent = function(obj, evt, fn) {
        obj["on" + evt] = null;
    }; 
} 






//style static methods
//for css
// I haven't use it yet... but I have faith that it works
xObject.css = function(el, css, value){
    let cssType = typeof css;
    let valueType = typeof value;
    let elStyle = el.style;
    if(cssType !== "undefined" && valueType === "undefined") {
        if(cssType === "object") {
            for(let prop in css) {
                if(css.hasOwnProperty(prop)) {
                    elStyle[prop] = css[prop];
                }
            }
        }else if(cssType === "string" ){
            return getStyle(el, css);
        }else{
            throw{message : "Invalid parameters passed to css()"};
        }
    }else if(cssType === "string" && valueType == "string") {
        //checking for IE broswer
        elStyle[css] = value;
    }else{
        throw{message : "Invalid parameters passed to css()"};
    }
};
   

//style instance methods
// css prototype
// To use it you have to first call new xObject then give it 
// an id before usage
// usage: elementName.css("css","value");
xObject.prototype.css = function(css, value){
    return xObject.css(this.el, css, value) || this;
};



//creating element(s)
/**
 * the syntax for creating  single and multiple html-elements
 * 
 * let el = xObject.createElement({
    tagName : "give tag-name", eg: div
    id : "id-name",            eg: foo
    className : "class-name",  eg: bar
            
            |
            v
    the continuation of the code is below,

    Note:You can add children to the previous element by calling children in the form 
    of an array
    Example is shown below,

            |
            v
    children : [{
        tagName : "div",
        html : " hello, welcome I am a child",
        attributes : {
            align : "center"
        },
        children : [{
            tagName : "img",
            id : "img-tag",
            }]
        }]
    });

    in the DOM you will have:

    <div id="foo" class="bar"> 
         <div align = "center"> 
            hello, welcome I am a child
            <img id = "img-tag">
        <div>
    <div>

    then we will append " el " the body 
    document.body.appendChild(el);
 */
xObject.createElement = function(obj) {
    if(!obj || !obj.tagName) {
        throw { message : "Invalid argument"};
    }
    let el = document.createElement(obj.tagName);
    obj.id && (el.id = obj.id);
    obj.className && (el.className =obj.className);
    obj.html && (el.innerHTML = obj.html);

    //adding attributes
    if(typeof obj.attributes !== "undefined") {
        let attr = obj.attributes,
        prop;//property

        for(prop in attr) {
            if(attr.hasOwnProperty(prop)) {
                el.setAttribute(prop, attr[prop]);
            }
        }
    }
    if(typeof obj.children !== "undefined") {
        let child,
        i = 0;
        while(child = obj.children[i++]) {
            el.appendChild(this.createElement(child));
        }
    }
    return el;
};


// html prototype
// creates html 
// eg: html : " hello, createElement",
xObject.prototype.html = function(html) {
    if(html) {
        this.el.innerHTML = html;

        return this;
    } else {
        return this.el.innerHTML;
    }
};


// append prototype method to append elements to other element
// usage: elementName.append(elementChildName);
xObject.prototype.append = function(data) {
    if(typeof data.nodeType !== "undefined" && data.nodeType == 1) {
        this.el.appendChild(data);
    } else if(data instanceof xObject) {
        this.el.appendChild(data.el);
    } else if(typeof data === "string") {
        let html = this.el.innerHTML;
        this.el.innerHTML = html + data;
    }
    return this;
};


// append static method to append elements to other element
// usage: elementName.append(elementChildName);
xObject.append = function(data) {
    if(typeof data.nodeType !== "undefined" && data.nodeType == 1) {
        this.el.appendChild(data);
    } else if(data instanceof xObject) {
        this.el.appendChild(data.el);
    } else if(typeof data === "string") {
        let html = this.el.innerHTML;
        this.el.innerHTML = html + data;
    }
    return this;
};



// function getStyle for css
let getStyle = (function(){
   if(typeof getComputedStyle !== "undefined") {
       return function(el, cssProp) {
           return getComputedStyle(el, null).getPropertyValue(cssProp);
       }
   }else{
       return function(el, prop) {
           return el.currentStyle[cssProp];
       };
   }
}());




// some testing of the library


// for css you have to call a new xObject to modify the element
// and for ids

// for #top
let top_color = new xObject("toper");
top_color.css("background-color","green");
top_color.css("border","dotted");
top_color.css("height","300px");
top_color.css("display","flex");
top_color.css("justify-content","center");
top_color.css("align-items","center");
top_color.css("font-size","50px");
top_color.css("transition","0.5s");

//using the instance methods of eventListener to mouseout and mouseover
if(top_color.mouseover){
    top_color.mouseover(function(){
    this.css("color","white");
    });
}

if(top_color.mouseout){
    function setBlack(){
        this.css("color","black");
    }
    top_color.mouseout(setBlack);
}


// for #middle
let mid_css = new xObject("middle");
mid_css.css("background-color","blue");
mid_css.css("border","dotted");
mid_css.css("height","300px");
mid_css.css("margin-top","50px");

// for footer
let foot_css = new xObject("foot");
foot_css.css("background-color","pink");
foot_css.css("border","dotted");
foot_css.css("height","300px");
foot_css.css("margin-top","50px");


// creating child(S) for middle
let middle_children = xObject.createElement({
    tagName : "span",
    id : "img-div",
    className : "css-class",
    children : [{
        tagName : "img", 
        id :"img-in",     
    }],   
});

let middle_children2 = xObject.createElement({
    tagName : "span",
    id : "img-div2",
    className : "css-class",
    children : [{
        tagName : "img", 
        id :"img-out",     
    }],   
});


// append it to middle
middle.append(middle_children);
middle.append(middle_children2);

// inserting img in img-in and img-out respectively
xObject.idImageFunction("img-in", "img/howard.jpeg");
xObject.idImageFunction("img-out", "img/orchard.jpg");


let img_in = new xObject("img-in");
img_in.css("width","50%");
img_in.css("height","50%");


let img_out = new xObject("img-out");
img_out.css("padding-left","50%");
img_out.css("width","50%");
img_out.css("height","50%");

//using the static methods to of eventListener to mouseout and mouseover
xObject.addEvent(document,"mouseover", function(event){
    if(event.target.id === "img-in") {
        xObject.idImageFunction("img-in", "img/header.jpg");
    }
});

xObject.addEvent(document,"mouseout", function(event){
    if(event.target.id === "img-in") {
        xObject.idImageFunction("img-in", "img/howard.jpeg");
    }
});


//adding a child to toper
let top_child = xObject.createElement({
    tagName : "span",
    id : "span-me",
    className : "span-class",
    html: "<b>Using Library</b>"
});

toper.append(top_child);

