function chicken(n){
let local = n;
return () => local;
}
 
let wrap = chicken(23);
console.log(wrap);