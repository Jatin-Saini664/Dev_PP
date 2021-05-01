// Ques 1
// let objectToClone = {
//     "A":"Films",
//     "B":"Entrepreneur"
// }

// let cloned = JSON.parse(JSON.stringify(objectToClone));

// cloned["A"]="StartUp";

// B 
// let cloned1 = objectToClone

// cloned1["A"]="StartUp";

// console.log(cloned, objectToClone);

//ans = 2

// Ques 2
// let p = new Promise(function (resolve, reject) {
//     reject(new Error("some error"));
//     setTimeout(function(){
//       reject(new Error("some error"));
//     },1000)
//     reject(new Error("some error"));
//   });
  
//   p.then(null, function (err) {
//     console.log(1);
//     console.log(err);
//   }).catch(function (err) {
//     console.log(2);
//     console.log(err);
//   });


// ans = 3;

// Ques 3
// let p = new Promise(function (resolve, reject) {
//     setTimeout(function () {
//       reject(new Error("some value"));
//     }, 2000);
  
//     resolve("some error");
  
//     setTimeout(function () {
//       reject(new Error("some value"));
//     }, 2000);
  
//     resolve("some error");
  
//     setTimeout(function () {
//       reject(new Error("some value"));
//     }, 2000);
//   });
  

//   p.then(null, function (err) {
//     console.log(1);
//     console.log(err);
//   });
  
//   p.catch(function (err) {
//     console.log(2);
//     console.log(err);
//   });
  
//   p.finally(function () {
//     console.log(1);
//   })
  
//   p.finally(function () {
//     console.log(2);
//   }).then(function (val) {
//     console.log(val);
//   })
  
//   p.then(
//     function (val) {
//       console.log(val);
//     },
//     function (err) {
//       console.log(err);
//     }
//   );

// ans=2;

// Ques 4
// function f(x) {
//     return x*x;
// }

// f.description = "This function returns the square"

// let arr = [1, 2, 3, 4, 5]
// console.log(arr.length);
// arr.length = 6
// arr.pop()
// console.log(arr.length);
// console.log(f);
// console.log(f());
// console.log(f());

// ans=1;


// Ques 5
// function deepClone(objToClone){
//     let newObjToClone = JSON.parse(JSON.stringify(objToClone));
//     return newObjToClone;
// }


// let objectToClone = {
//     "A":"Films",
//     "B":"Entrepreneuer"
// }

// let cloned = deepClone(objectToClone);

// cloned["A"] = "StartUp";

// console.log(cloned, objectToClone);

// Ques 6
// console.log(1);

// setTimeout(function () {
//   console.log(3);
// });

// console.log(4);

// setTimeout(function () {
//   console.log(2);
// });

// Promise.resolve().then(function () {
//   console.log(5);
// });

// console.log(6);

// ans=1;


// Ques 7
// setTimeout(function () {
//     console.log(4);
//   });
//   setTimeout(function () {
//     console.log(5);
//   });
  
//   let p = new Promise(function (resolve, reject) {
//     resolve();
//   });
  
//   console.log(1);
  
//   p.then(function () {
//     console.log(2);
//   });
  
//   p.then(function () {
//     console.log(3);
//   });
  
//   setTimeout(function () {
//     console.log(6);
//   });

// Ques 8
// try {
//     let a = null;
  
//     b = a;
  
//     delete a;
  
//     b = undefined;
  
//     console.log(a);
//     console.log(b);
//     console.log(c);
//   } catch (err) {
//     console.log(err.message);
//   }


// ans=4;


// Ques 9
// function divisible(sum1, sum2){
//     if(sum1%2==0&&sum1%sum2==0){
//         return sum1/sum2;
//     }else{
//         throw new Error("Incompatible Types");
//     }
// }

// let a = divisible(10, 20);

// console.log(a);





