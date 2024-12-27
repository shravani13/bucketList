
const enterButton=document.querySelector("#input-enter");
const inputText=document.querySelector("#input-text");
const divContainer=document.getElementById("container");

let localdata=JSON.parse(localStorage.getItem("bucketList"));
let bucketList=localdata || [];
displayBucketList();
function uuid(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(param){
        let number=Math.random()*16 | 0;
        let randomNumber=param == 'x'?number:(number & 0x3|0x8);
        return randomNumber.toString(16);
    });
}

function addBucketListItems(event){
    event.preventDefault();
    let item=inputText.value;
    if (item.length>0){
        bucketList.push({id: uuid(),data:item,isCompleted: false});
        inputText.value='';
    }
    displayBucketList();
    localStorage.setItem("bucketList",JSON.stringify(bucketList));
}
enterButton.addEventListener('click', addBucketListItems)
inputText.addEventListener('keypress', (event)=>{
    if(event.key === "Enter"){
        addBucketListItems(event);
    }
})

 divContainer.addEventListener('click',(event)=>{
    //event.preventDefault();
    console.log(event.target);
    let key=event.target.dataset.key;
    let delKey=event.target.dataset.getkey;
    // console.log(delKey)
    bucketList=bucketList.map(item=>item.id == key?{...item,isCompleted: !item.isCompleted}:item);
    bucketList=bucketList.filter(item=>item.id !== delKey);
    console.log(bucketList)
    displayBucketList();
    localStorage.setItem("bucketList",JSON.stringify(bucketList));
 })


function displayBucketList(){
    let newElement='';
    for(let item of bucketList){
        newElement+=`<div id=list><input id="item-${item.id}" type="checkbox" data-key=${item.id}><label for="item-${item.id}" class="${item.isCompleted? "checkedItem" : ''}">${item.data}</label><button data-getkey=${item.id} id="delete" type="submit"><svg data-getkey=${item.id} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path data-getkey=${item.id} d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button></div>`;
    }
    divContainer.innerHTML=newElement;
    // divContainer.innerHTML=bucketList.map((item)=>`<div id=list><input id="item-${item.id}" type="checkbox" data-key=${item.id}><label for="item-${item.id}" class="${item.isCompleted? "checkedItem" : ''}">${item.data}</label><button data-getkey=${item.id} id="delete" type="submit"><svg data-getkey=${item.id} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path data-getkey=${item.id} d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button></div>`)
    
}
{/* <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg> */}