var fname;
var lname;
var dob;
var gender;
var persons = [];
var data;
var i;
var isFiltered = false;
var filteredPersons;

function validation() {
    fname = document.getElementById("fname").value;
	  fname = fname.trim();
    lname = document.getElementById("lname").value;
    lname = lname.trim();

    dob = document.getElementById("dob").value;
    var today = new Date();
    var dob1 = new Date(dob);

    if (document.getElementById("man").checked){
        gender = true;
    }
    else{
        gender = false;
    }

    if (fname.length<2){
        valResult(1);
    }
    else if (lname.length<2){
        valResult(2);
    }
    else if (today<dob1){
        valResult(3);
    }
    else {
         valResult(0);
    }
}

function valResult(res){
    switch(res){
        case 1:
            document.getElementById("fnameError").innerHTML = "Name is too short.";
            break;
        case 2:
            document.getElementById("lnameError").innerHTML = "Last name is too short.";
            break;
        case 3:
            document.getElementById("dobError").innerHTML = "Invalid date of birth.";
            break;
        case 0:
            addPerson();
    }
}

function addPerson() {
    var obj = {};
    obj["fname"]=fname;
    obj["lname"]=lname;
    obj["dob"]=dob;
    obj["man"]=gender;
    obj["id"]=persons.length+1;
    var dob1 = new Date(dob);
    var today = new Date();
    if (today.getMonth() > dob1.getMonth() || (today.getMonth() == dob1.getMonth()) && today.getDate() >= dob1.getDate()){
        var age = today.getFullYear() - dob1.getFullYear();
    }
    else {
        var age = (today.getFullYear() - dob1.getFullYear()) - 1;
    }
    obj["age"]=age;
    i=persons.push(obj);
    $("#output").show();
    $('#output tr:last').after('<tr><td>'+obj.fname+'</td><td>'+obj.lname+'</td><td>'+obj.dob+'</td><td class="hidden">'+obj.age+'</td><td></td></tr>');
}

function showAge(checkbox){
    if (checkbox.checked){
        changeContent(isFiltered ? filteredPersons : persons, checkbox.checked);
    }
    else {
        changeContent(isFiltered ? filteredPersons : persons, checkbox.checked);
    }
}

function setFilter(){
    var filter = document.getElementById("genders").value;
    var length = persons.length;
    filteredPersons = [];
    switch (filter){
        case "man":
            for (var j=0; j<length; j++){
                if (persons[j].man == true){
                    filteredPersons.push(persons[j]);
                }
            }
            isFiltered = true;
            break;
        case "woman":
            for (var j=0; j<length; j++){
                if (persons[j].man == false){
                    filteredPersons.push(persons[j]);
                }
            }
            isFiltered = true;
            break;
        case "all":
            filteredPersons = persons.slice(0);
            isFiltered = false;
            break;
    }
    var age = document.getElementById("showAge").checked;
    changeContent(filteredPersons, age);
}

function changeContent(array, age){
    $('#output tbody').empty();
    if (age){
        for (var j=0; j<array.length; j++){
            $('#output tbody').append('<tr><td>'+array[j].fname+'</td><td>'+array[j].lname+'</td><td>'+array[j].age+'</td><td><img src="delete.png" height="20" id="del'+j+'"></td></tr>');
            $('#output tbody').on('click', '#del'+i, function(){
                array.slice(j);
            });
        }
    }
    else{
        for (var j=0; j<array.length; j++){
            $('#output tbody').append('<tr><td>'+array[j].fname+'</td><td>'+array[j].lname+'</td><td>'+array[j].dob+'</td><td><img src="delete.png" height="20" id="del'+j+'"></td></tr>');
            $('#output tbody').on('click', '#del'+i, function(){
                array.slice(j);
            });
        }
    }
}

function saveStorage(){
    if (typeof(Storage) !== "undefined") {
        localStorage["persons"]=JSON.stringify(persons);
    } else {
        document.getElementById("error").innerHTML = "Sorry, your browser does not support Web Storage...";
    }
}

function loadStorage(){
    if (typeof(Storage) !== "undefined") {
        if (localStorage.getItem("persons") === null){

        }
        else {
            persons = JSON.parse(localStorage["persons"]);
            $("#output").show();
            $('#output tbody').empty();
            var length = persons.length;
            for (i=0; i<length; i++){
                $('#output tbody').append('<tr><td>'+persons[i].fname+'</td><td>'+persons[i].lname+'</td><td>'+persons[i].dob+'</td><td class="hidden">'+persons[i].age+'</td><td><img src="delete.png" height="20" id="del'+i+'"></td></tr>');
                $('#output tbody').on('click', '#del'+i, function(){
                    persons.slice(i);
                });
            }
        }
    } else {
        document.getElementById("error").innerHTML = "Sorry, your browser does not support Web Storage...";
    }
}


$(document).ready(function(){
    $("#fname").keyup(function(event) {
        var fname=$("#fname").val();
        if(fname.trim().length>1){
            $("#fnameError").html("");
        }
    });

    $("#lname").keyup(function(event) {
        var lname=$("#lname").val();
        if(lname.trim().length>1){
            $("#lnameError").html("");
        }
    });

    $("#dob").change(function(event) {
        var dob = new Date($("#dob").val());
        var today = new Date();
        if(today>=dob){
            $("#dobError").html("");
        }
    });
})
