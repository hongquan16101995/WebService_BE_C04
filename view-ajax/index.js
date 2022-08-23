function getAllStudent() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8088/students",
        success: function (data) {
            let table = document.getElementById("list")
            if (table.style.display === "none") {
                table.style.display = "block"
                document.getElementById("form").style.display = "none"
            }
            document.getElementById("list").innerHTML = displayTable(data)
        }
    })
}

function displayTable(data) {
    let result = ""
    result += "<table border='1' width='300px'>"
    result += "<tr>"
    result += "<th>ID</th>"
    result += "<th>Name</th>"
    result += "<th>Age</th>"
    result += "<th>Address</th>"
    result += "<th colspan='2'>Action</th>"
    result += "</tr>"
    for (let i = 0; i < data.length; i++) {
        result += "<tr>"
        result += "<th>"+ data[i].id +"</th>"
        result += "<th>"+ data[i].name +"</th>"
        result += "<th>"+ data[i].age +"</th>"
        result += "<th>"+ data[i].address +"</th>"
        result += "<th><button onclick='update("+ data[i].id +")'>Update</button></th>"
        result += "<th><button onclick='deleteStudent("+ data[i].id +")'>Delete</button></th>"
        result += "</tr>"
    }
    result += "</table>"
    return result
}

function formCreate() {
    document.getElementById("name").value = ""
    document.getElementById("age").value = ""
    document.getElementById("address").value = ""
    document.getElementById("button").innerHTML = "Create"
    document.getElementById("form").style.display = "block"
    document.getElementById("list").style.display = "none"
    document.getElementById("button").setAttribute("onclick", "createStudent()")

}

let idStudent;

function update(id) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8088/students/" + id,
        success: function (data) {
            idStudent = data.id
            document.getElementById("name").value = data.name
            document.getElementById("age").value = data.age
            document.getElementById("address").value = data.address
            document.getElementById("button").innerHTML = "Update"
            document.getElementById("button").setAttribute("onclick", "updateStudent()")
            document.getElementById("form").style.display = "block"
        }
    })
}

function deleteStudent(id) {
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8088/students/" + id,
        success: getAllStudent
    })
}

function updateStudent() {
    let name = $('#name').val()
    let age = $('#age').val()
    let address = $('#address').val()

    let student = {
        id: idStudent,
        name: name,
        age: age,
        address: address,
    }

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        url: "http://localhost:8088/students",
        data: JSON.stringify(student),
        success: function () {
            getAllStudent()
            document.getElementById("form").style.display = "none"
        }
    })
    event.preventDefault()
}

function createStudent() {
    let name = $('#name').val()
    let age = $('#age').val()
    let address = $('#address').val()

    let student = {
        name: name,
        age: age,
        address: address,
    }

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        url: "http://localhost:8088/students",
        data: JSON.stringify(student),
        success: getAllStudent
    })
    event.preventDefault()
}
