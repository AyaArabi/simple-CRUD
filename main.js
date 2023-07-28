var courseName= document.getElementById("courseName");
var courseCategory = document.getElementById("courseCategory");
var coursePrice= document.getElementById("coursePrice");
var courseDescription= document.getElementById("courseDescription");
var courseCapacity= document.getElementById("courseCapacity");
var btnadd= document.getElementById("btnadd");
var data=document.getElementById("data");
var search=document.getElementById("search");
var updateBtn=document.getElementById("updateBtn");
updateBtn.style.display='none';
var courses;
var prevName;
var isNamevalid=false;
var isCatvalid =false;
var isPrivalid=false;
var isDesvalid=false;
var isCApvalid=false;
//لاظهار البيانات من اللوكال ستورج
if (localStorage.getItem('courses')== null){
courses=[];
}
else{
  courses=JSON.parse(localStorage.getItem('courses'))
  readData();
} 

var curentIndex;
//add course
btnadd.onclick= function(e){
e.preventDefault();
addCourse();
reset();
readData();
}

function addCourse(){
    var course={
        courseName: courseName.value,
        courseCategory: courseCategory.value,
        coursePrice: coursePrice.value,
        courseDescription: courseDescription.value,
        courseCapacity: courseCapacity.value
    }
        courses.push(course);
        localStorage.setItem('courses', JSON.stringify(courses));
      
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Add course sucssuflly',
            showConfirmButton: false,
            timer: 1500
          })
}

function reset(){
    courseName.value="";
    courseCategory.value="";
    coursePrice.value="";
    courseDescription.value="";
    courseCapacity.value="";
}
//display data
function readData(){
  
    var result=``;
    for(var i=0;i<courses.length;i++){
        result += `
        <tr>
        <td>${i+1}</td>
        <td>${courses[i].courseName}</td>
        <td>${courses[i].courseCategory}</td>
        <td>${courses[i].coursePrice}</td>
        <td>${courses[i].courseDescription}</td>
        <td>${courses[i].courseCapacity}</td>
        <td><button class="btn btn-info" onclick="updateCourse(${i})">update</button></td>
        <td><button class="btn btn-danger" onclick="deleteCourse(${i})" >delete</button></td>
    </tr>
        `
    }
data.innerHTML=result;
}
//delete all courses
document.getElementById("deleteBtn").onclick= function(){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            courses=[];
            localStorage.setItem('courses',JSON.stringify(courses))
            data.innerHTML="";
          Swal.fire(
            'Deleted!',
            'all courses has been deleted.',
            'success'
          )
        }
      })
   
}
//delete course 
function deleteCourse(index){
 
    Swal.fire({ 
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {

        if (result.isConfirmed) {
            courses.splice(index,1);
            localStorage.setItem('courses',JSON.stringify(courses))
            readData();
          Swal.fire(
            'Deleted!',
            'Your course has been deleted.',
            'success'
          )
        }
      })
   
}
//search 
search.onkeyup = function(){
  
    var result=``;
    for(var i=0;i<courses.length;i++){
    if(courses[i].courseName.toLowerCase().includes(search.value.toLowerCase()))
    {
        result += `
    <tr>
    <td>${i+1}</td>
    <td>${courses[i].courseName}</td>
    <td>${courses[i].courseCategory}</td>
    <td>${courses[i].coursePrice}</td>
    <td>${courses[i].courseDescription}</td>
    <td>${courses[i].courseCapacity}</td>
    <td><button class="btn btn-info" onclick="updateCourse(${i})"</button></td>
    <td><button class="btn btn-danger" onclick="deleteCourse(${i})">delete</button></td>
</tr>
    `
    }
    data.innerHTML=result;
}

}
//uodate course
function updateCourse(index) {
  btnadd.style.display='none';
  updateBtn.style.display='inline';
curentIndex=index;
 prevName=courses[index].courseName;
courseName.value=courses[index].courseName;
courseCapacity.value=courses[index].courseCapacity;
courseCategory.value=courses[index].courseCategory;
courseDescription.value=courses[index].courseDescription;
coursePrice.value=courses[index].coursePrice;
}
updateBtn.onclick= function(e){
  e.preventDefault();
  btnadd.style.display='inline';
  updateBtn.style.display='none';

  var course={
       courseName: courseName.value,
    courseCategory: courseCategory.value,
    coursePrice: coursePrice.value,
    courseDescription: courseDescription.value,
    courseCapacity: courseCapacity.value
  }
  
  courses[curentIndex].courseName=course.courseName;
  courses[curentIndex].courseCapacity=course.courseCapacity;
  courses[curentIndex].courseDescription=course.courseDescription;
  courses[curentIndex].courseCategory=course.courseCategory;
  courses[curentIndex].coursePrice=course.coursePrice;
  localStorage.setItem('courses',JSON.stringify(courses))
  
  
reset();
console.log(hhh)
  readData();
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: `${prevName} course sucssuflly update`,
    showConfirmButton: false,
    timer: 1500
  })
}

function checkInput(){
  if(isNamevalid && isCApvalid && isCatvalid && isDesvalid && isPrivalid)
{
  btnadd.removeAttribute('disabled');
  console.log("hhhhhhhhhhhhh")
}
else{
  btnadd.setAttribute('disabled','disabled')
}
}


//patren Name اول حرف كابتل ومن 3-10 احرف //

var nameAlert=document.getElementById("nameAlert");
nameAlert.style.display= 'none';
courseName.onkeyup=function(){
  var pattren=/^[A-Z][a-z]{2,9}$/
  if(pattren.test(courseName.value)){
    isNamevalid=true;
    
    nameAlert.style.display= 'none';
    if(courseName.classList.contains('is-invalid'))
    {courseName.classList.replace('is-invalid','is-valid')}
    
    else 
    courseName.classList.add('is-valid')
   
  }else{
    isNamevalid=false;
    nameAlert.style.display= 'block'
    if(courseName.classList.contains('is-valid'))
    {courseName.classList.replace('is-valid','is-invalid')}
    else
    courseName.classList.add('is-invalid')
  
  }
  checkInput();
}
//patren capacity خانتين 
var capacityAlert=document.getElementById("capacityAlert");
capacityAlert.style.display= 'none';
courseCapacity.onkeyup=function(){
  var pattren=/^[1-9][0-9]{1,2}$/;
  if(pattren.test(courseCapacity.value)){
    isCApvalid=true;
    capacitAlert.style.display= 'none';

    if(courseCapacity.classList.contains('is-invalid'))
    {courseCapacity.classList.replace('is-invalid','is-valid')}
    
    else {courseCapacity.classList.add('is-valid')}

  }else{
    isCApvalid=false
    capacitAlert.style.display= 'block';

    if(courseCapacity.classList.contains('is-valid'))
    {courseCapacity.classList.replace('is-valid','is-invalid')}
    else{ courseCapacity.classList.add('is-invalid')}
   
  
  }
  checkInput();
}


//patren price 3-4
var priceAlert=document.getElementById("priceAlert");
priceAlert.style.display= 'none';
coursePrice.onkeyup=function(){
  var pattren=/^[1-9][0-9]{2,3}$/
  if(pattren.test(coursePrice.value)){
    isPrivalid=true
    priceAlert.style.display= 'none';
    if(coursePrice.classList.contains('is-invalid'))
    {coursePrice.classList.replace('is-invalid','is-valid')}
    
    else 
    coursePrice.classList.add('is-valid')

  }else{
    isPrivalid=false
    priceAlert.style.display= 'block';
    if(coursePrice.classList.contains('is-valid'))
    {coursePrice.classList.replace('is-valid','is-invalid')}
    else
    coursePrice.classList.add('is-invalid')
  
  }
  checkInput();
}
/*patren category اول حرف كابتل 3-20 حرف */
var categoryAlert=document.getElementById("categoryAlert");
categoryAlert.style.display='none';
courseCategory.onkeyup=function(){
  var pattren=/^[A-Z][a-z]{3,20}$/
  if(pattren.test(courseCategory.value)){
    categoryAlert.style.display= 'none';
    isCatvalid=true
    if(courseCategory.classList.contains('is-invalid'))
    {courseCategory.classList.replace('is-invalid','is-valid')}
    
    else 
    courseCategory.classList.add('is-valid')

  }else{
    isCatvalid=false
    categoryAlert.style.display='block';
    if(courseCategory.classList.contains('is-valid'))
    {courseCategory.classList.replace('is-valid','is-invalid')}
    else
    courseCategory.classList.add('is-invalid')
  
  }
  checkInput();
}
//pattren description كبتل اول حرف الباقي ممكن كبتل وسمول واراقام وسبيسات
var descriptionAlert=document.getElementById("descriptionAlert");
descriptionAlert.style.display= 'none';
courseDescription.onkeyup=function(){
  var pattren=/^[A-Z][A-Za-z0-9\s]{3,119}$/
  if(pattren.test(courseDescription.value)){
    isDesvalid=true
    descriptionAlert.style.display= 'none';

    if(courseDescription.classList.contains('is-invalid'))
    {courseDescription.classList.replace('is-invalid','is-valid')}
    
    else 
    courseDescription.classList.add('is-valid')

  }else{
    isDesvalid=false
    descriptionAlert.style.display= 'block';

    if(courseDescription.classList.contains('is-valid'))
    {courseDescription.classList.replace('is-valid','is-invalid')}
    else
    courseDescription.classList.add('is-invalid')
  
  }
  checkInput();
}
