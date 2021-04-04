// const num = 5;
// console.log(num + 5);
// let a = 6;
// a = a + num;
// console.log(num - a);

// let a = 2;
// {
//   let a = 3;
//   {
//     let a = 4;
//     {
//       let a = 5;
//       console.log(a);
//     }
//     console.log(a);
//   }
//   console.log(a);
// }
// console.log(a);

// let obj = [
//     { name: "Roorkee", rainfall: [5, 6, 5, 5, 4, 7, 8] },
//     { name: "Pauri", rainfall: [3, 3, 3, 1, 2, 2, 2] },
//   ];

// let newArray=[];

// for(let i=0;i<obj.length;i++){
//     let ans=0;
//     for(let j=0;j<obj[i]["rainfall"].length;j++){
//         ans+=obj[i]["rainfall"][j];
//     }
//     ans/=obj[i]["rainfall"].length;
//     let newObj = {
//         name:`${obj[i]["name"]}`,
//         avgRainfall:`${ans}`
//     }
//     newArray.push(newObj);
// }
// console.log(newArray);

// let obj = {
//     newObj: {
//       obj2: {
//         obj5: {
//           one: 1,
//         },
//       },
//     },
//     obj3: {
//       obj4: { two: 2 },
//     },
//   };

// let newObj={};

// for(let key in obj){
//     // console.log(obj[key]);
//     console.log(typeof(key));
//     nestedObj(key, newObj, "", oldObj);
//     // console.log(typeof(obj[key]));
// }

// console.log(newObj);

// function nestedObj(obj1, newObj, str, oldObj){
//     if(typeof(obj[obj1])!="object"){
//         let ans=str+obj1; 
//         newObj[ans]=oldObj[obj1];
//         return;
//     }
    
//     for(let key in obj1){
//         nestedObj(obj1[key], newObj, str+obj1+"");
//     }
// }

// (function () {
//     if ((-100 && 100 && "0") || [] === true || 0) {
//       console.log(1);
//       if ([] || (0 && false)) {
//         console.log(2);
//       }
  
//       if (Infinity && NaN && "false") {
//         console.log(3);
//         if ("") {
//           console.log(4);
//         }
//       } else {
//         console.log(5);
//         if (({} || false === "") && !(null && undefined)) {
//           console.log(6);
//         }
//       }
//     } else {
//       console.log(7);
//     }
//   })();


let arr = [1, 2, 3];
(function () {
  for (x in arr) arr.unshift(arr.pop());
  console.log(arr);
})();

let randomAdder = function (arr = ["a", "b"]) {
  arr[arr.length * arr.length] = arr.length * arr.length;
};

randomAdder(arr);
randomAdder();

console.log(arr[9]);
console.log(arr[8]);

// let a = "This only works if and only if";

// let b = a.slice(a.indexOf("only"));

// let c = b.lastIndexOf("only");

// b[c] = "i";

// console.log(a);
// console.log(b);

// let a =3672;

// let ans=a.toString(2);

// while(a!=0){
//     int b=a%2;
//     ans=b.toString+ans;
//     a/=2;
// }

// console.log(ans);

// function spoon(str){
//     words = str.split(" ");
//     let ans="";
//     ans=words[1][0]+words[0].split(words[0][0])[1]+" ";
//     ans+=words[0][0]+words[1].split(words[1][0])[1];
//     return ans;
// }

// console.log(spoon("flying kite"));

// function f() {
//     console.log(arguments);
//   }
  
//   function f(a, b) {
//     return a + b;
//   }
  
//   console.log(f(2, 3, 4, 5));
  
//   function f(x, y, z, t) {
//       return x + y + z + t;
//   }
  
//   console.log(f(2, 3, 4, 5));

// console.log(a);
// f(2, 3, 4, 5);

// var a = 1;
// var a = 2;
// console.log(a);
// console.log(b);
// let b = 2;

// function f() {
//   console.log(arguments);
// }


// let obj = {"concept":""};


// console.log(
//   JSON.parse(
//     JSON.stringify(obj).slice(0, 12) + "JSON" + JSON.stringify(obj).slice(12)
//   ).concept
// );
