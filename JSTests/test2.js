// let arr = [1, 2, 3, 4];

// function g(a){
//     arr=a;
// }

// function f(arr) {
//     let arr1 = [...arr];
//     for (x in arr1) {
//         arr1[x] = 0
//     }
//     g(arr1);
//     return arr1;
// }

// console.log(arr);

// console.log(f(arr));

// console.log(arr);


// ques 2


// let obj = {
//     1: 0,
//     2: 1,
//     3: 2,
//     4: 3,
//     5: 4,
//     length: 5,
//   };
  
//   function f() {
//     for (let i = 1; i < obj.length; i++) {
//       obj[i] = obj[i] + 1;
//     }
//     delete obj["length"];
//     for (let x in obj) {
//       console.log(`at index ${x} we have value ${obj[x]}`);
//     }
//   }
  
//   f();

// function f(obj){
//     return obj;
// }

// function g(f){
//     let obj1 = f(obj);
//     for(let i=1;i<obj1.length;i++){
//         obj1[i]+=1;
//     }
//     delete obj1["length"];
//     for(let x in obj1){
//         console.log(`at index ${x} we have value ${obj1[x]}`);
//     }
// }

// g(f);


// ques 3

// function f(x, y){
//     return x*y;
// }

// console.log(f(10, 20))

// (
//     function a(y){
//         console.log(f(10, y));
//     }
// )(20)


//ques 4

// let a = ["a", "b"]
// a[2] = a 

// function f(a) {
//     a = a[2]
//     console.log(a);
//     let n = Array("a", "b")
//     console.log(a[2] = n);
//     console.log(a);
//     console.log(n);
//     a = n;
//     console.log(a);
// }


// console.log(a);
// f(a)
// console.log(a);

//ques 5

// let arr = [1, 2, 3, 4, 5];

// Array.prototype.reduceArray = function(callback){
//     let sum=0;

//     for(let i=0;i<this.length;i++){
//         sum+=this[i];
//     }

//     return sum;
// }

// let sum = arr.reduceArray(function(data){
//     return data;
// });

// console.log(sum);

//ques 6

// function newSetInterval(f1, time){
//     return setTimeout(function(){f1();},time);
// }


// let a = newSetInterval(f1, 3000);

// function f1(){
//     console.log("we are inside the function");
// }

// ques 7
// let count = 0;
// let interval = setInterval(function () {
//   console.log(count);
//   count++;
// }, 100);

// setTimeout(function () {
//   clearInterval(interval);
//   interval = setInterval(function () {
//     console.log(count);
//     count--;
//     if (count < 0) clearInterval(interval);
//   });
// }, 500);

// ans = 4

//ques 8

// //A
// function transducer(arr, fFn, mFn) {
//     let nArr = arr.filter(fFn);
//     nArr = nArr.map(mFn);
//     return nArr;
//   }
  
  
//   //B
//   function transducer(arr, fFn, mFn) {
//     let nArr = [];
//     for (x in arr) {
//       if (fFn(arr[x])) {
//         nArr.push(arr[x]);
//       }
//     }
  
//     for (x in nArr) {
//       nArr[x] = mFn(nArr[x]);
//     }
//     return nArr;
//   }
  
  // Options:
  
  // 1) A
  // 2) B
  // 3) Both
  // 4) None

//ques 9

// function globalFunction(x) {
//     return function outerFunction(y) {
//       return function innerFunction(z) {
//         return x + y + z;
//       };
//     };
//   }
  
//   let instance1 = globalFunction(2);
//   var instance2 = instance1(3);
//   console.log(instance2());
  
  
  // Options:
  
  // 1) undefined
  // 2) error
  // 3) NaN
  // 4) 5undefined

//   ans=3

// ques 10

// let arr = ["a", "b", "c", "d", 1, 2, 3, 4];

// arr.map(function (e) {
//   return 2 * e;
// });

// (function () {
//   arr.filter(function () {});
// })();

// console.log(arr);

// let nArr;
// nArr = arr.filter(function (e) {
//   return Number.isInteger(e);
// });
// nArr = new Array();
// console.log(nArr);

// nArr = arr
//   .filter(function (e) {
//     return !Number.isInteger(e);
//   })
//   .map(function (e) {
//     return e + 1;
//   });

// console.log(nArr);

// ans = 4;