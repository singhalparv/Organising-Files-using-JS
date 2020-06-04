let arr=[3,6,14,16,22];
function transformer(ele){
    if(ele%2==0){
        return ele+1;;
    }
    else{
        return ele-1;
    }
}

function test(ele){
    for(let i=2;i*i<=ele;i++){
        if(ele%i==0){
            return false;
        }
    }
    return true;
}

let newarr=arr.map(transformer);

let fArr=newarr.filter(test);
console.log(fArr);
console.log("````````````````````");
console.log(arr);


//lodash---->
function mymap(arr,cb){
    
}
mymap(arr,transformer);
//myfilter(arr,transformer);