let myForm = document.getElementById("myForm");

function checkValidity(field, pattern) {
    if (!field.value.match(pattern)) {
        field.style.border = "1px solid red";
        return false;
    }
    else {
        field.style.border = "2px solid green";
        return true;
    }
}

myForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const fullNamePattern = /^[А-ЯІЇ][а-яії]+\s[А-ЯІЇ]\.[А-ЯІЇ]\.$/;
    const variantPattern = /^\d{1,2}$/;
    const phoneNumberPattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{2})[- ]?(\d{2})/;
    const facultyPattern = /^[А-ЯІЇ]{1,4}$/;
    const addressPattern = /^м.\s[А-ЯІЇ][а-яії]+$/;

    const fullName = document.getElementById("fullName");
    const variant = document.getElementById("variant");
    const phoneNumber = document.getElementById("phoneNumber");
    const faculty = document.getElementById("faculty");
    const address = document.getElementById("address");

    let fullNameValidity = checkValidity(fullName, fullNamePattern);
    let variantValidity = checkValidity(variant, variantPattern);
    let phoneNumberValidity = checkValidity(phoneNumber, phoneNumberPattern);
    let facultyValidity = checkValidity(faculty, facultyPattern);
    let addressValidity = checkValidity(address, addressPattern);

    if(fullNameValidity && variantValidity && phoneNumberValidity && facultyValidity && addressValidity)
    {
        var formDataString = 'Full Name: ' + fullName.value + '\nVariant: ' + variant.value + '\nPhone Number: ' + phoneNumber.value + '\nFaculty: ' + faculty.value + '\nAddress: ' + address.value;
        var newTab = window.open('', '_blank');
        newTab.document.write('<pre>' + formDataString + '</pre>');
    }
})


const variant = 2;
const body = document.querySelector('body');

for (let r = 0; r < 6; r++) {
    const rowElement = document.createElement('tr');
    for (let c = 0; c < 6; c++) {
        const index = String(c + 1 + (r * 6));
        const dataElement = document.createElement('td');
        dataElement.innerHTML = index;
        dataElement.id = index;
        rowElement.appendChild(dataElement);
        body.appendChild(rowElement);
    }
}

const cell = document.getElementById(variant);

cell.onmouseover = () => {
    cell.style.background = 'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255)
        + ',' + Math.floor(Math.random() * 255) + ')';
};

cell.onmouseup = () => {
    cell.style.background = document.getElementById('color').value;
}

cell.ondblclick = () => {
    var column = variant % 6;
    for (let i = 0; i < 6; i++) {
        const currentElement = document.getElementById(String(column + i * 6));
        currentElement.style.background = document.getElementById('color').value;
    }
    const current_ceil = document.getElementById(String(v));
    current_ceil.style.background = 'white';
}