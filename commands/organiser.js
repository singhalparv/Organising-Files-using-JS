let fs=require("fs");
let path=require("path");
let utility=require("./files");
function checkWhetherFile(src) {
  return fs.lstatSync(src).isFile();
}

function getContent(src) {
  return fs.readdirSync(src);
}

function getExtension(src){

    let ext=src.split(".").pop();
    return ext;

}
function sendFile(dest,category,src){
  let categoryPath=path.join(dest,category);
  if(fs.existsSync(categoryPath)==false){
    fs.mkdirSync(categoryPath);
  }
  let fName=path.basename(src);
  let cPath=path.join(categoryPath,fName);
  fs.copyFileSync(src,cPath);
}

function getCategory(ext){
    let types=utility.types;
    for(let category in types){
        for(let i=0;i<types[category].length;i++){
            if(ext==types[category][i]){
                console.log("Inside get category"+ category)
                return category;
            }
        }
    }
    return null;

}

function organiser(src, dest, obj) {
  // check whether file or directory
  if (checkWhetherFile(src) == true) {
    // copy with new name
    let ext=getExtension(src);
    let category=getCategory(ext);
    if(category==null){
        category="Others";
    }

    sendFile(dest,category,src);


     } else {
         let childNames=getContent(src);
         //console.log(childNames);
    for (let i = 0; i < childNames.length; i++) {
      if(childNames[i]=="Organised Files"){
          continue;
      }
        let childrenPath = path.join(src, childNames[i]);
      organiser(childrenPath, dest);
    }
  }
}

let src=process.argv[2];
let dest=path.join(src,"Organised Files")
if(fs.mkdirSync(dest)==false){
  fs.mkdirSync(dest);
}
organiser(src,dest);