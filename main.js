
var bookmarkNameInput = document.getElementById('bookmarkName');
var bookmarkUrlInput = document.getElementById('bookmarkUrl');
var submitBtn = document.getElementById('submit');
var nvalid = document.getElementById('Nvalid');
var bookmarkList =[];

if(localStorage.getItem('bookmark') !=null)
{
   bookmarkList=JSON.parse(localStorage.getItem('bookmark'));
   display(bookmarkList);
}
function submit(){
    if(nameValid() && urlValid()){
    var bookmark ={
        bookmarkName:bookmarkNameInput.value,
        bookmarkUrl:bookmarkUrlInput.value,
    };
    bookmarkList.push(bookmark);
     display(bookmarkList);
     localStorage.setItem('bookmark',JSON.stringify(bookmarkList));
}
else
noMatch()   
};

submitBtn.onclick =function(){
    submit();
    clearform();
}
function display(list){
    var box='';
    for(var i=0 ; i< list.length ;i++){
      box +=`
      <tr>
      <td>${i + 1 }</td>
      <td>${list[i].bookmarkName}</td>
    <td>
    <a href="${list[i].bookmarkUrl}" target="_blank">
    <button class="btn btn-visit text-white">
        <i class="fa-solid fa-eye me-1"></i>
        Visit
    </button>
    </a>
    </td>
    <td>
        <button class="btn btn-delete text-white" onclick="deletefun(${i})">
            <i class="fa-solid fa-trash-can me-1"></i>
            Delete
        </button>
    </td>
</tr>`
 }
   tableRow.innerHTML = box;
 };
 function deletefun(index)
 {
    bookmarkList.splice(index,1);
    localStorage.setItem('bookmark',JSON.stringify(bookmarkList));
    display(bookmarkList)
 }
 function clearform(){
    bookmarkNameInput.value='';
    bookmarkUrlInput.value='';
 };
 function nameValid(){
    var regex = /[A-Za-z1-9]{3,}/ 
    return regex.test(bookmarkNameInput.value);
 }
 function urlValid(){
    var regex =/(http(s):\/\/.)?[-a-zA-Z0-9@:%.\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%.\+.~#?&//=]*)$/
    return regex.test(bookmarkUrlInput.value);
 }
 function noMatch(){
    if(!nameValid()) 
     swal('Name not match , Site name must contain at least 3 characters'); 
   
    else if(!urlValid())
    swal('URL not match , Site URL must be a valid one')
 }
