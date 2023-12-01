function addPerson(){
    fetch("https://randomuser.me/api/")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const personalInfo = data.results[0];
            const person = new Person(
                personalInfo.picture,
                personalInfo.cell,
                personalInfo.location.city,
                personalInfo.location.country,
                personalInfo.location.postcode);
            person.createDiv();
        });
}


class Person {
    constructor(picture, cell, city, country, postcode) {
        this.picture = picture;
        this.cell = cell;
        this.city = city;
        this.country = country;
        this.postcode = postcode;
    }
    createDiv() {
        const divElement = document.createElement('div');
        divElement.id = 'person';


        const picture = document.createElement('img');
        picture.src = this.picture.large;
        divElement.appendChild(picture);


        const cell = document.createElement('p');
        cell.innerHTML = `Cell: ${this.cell}`
        divElement.appendChild(cell);


        const city = document.createElement('p');
        city.innerHTML = `City: ${this.city}`;
        divElement.appendChild(city);


        const email = document.createElement('p');
        email.innerHTML = `Country: ${this.country}`;
        divElement.appendChild(email);


        const coordinates = document.createElement('p');
        coordinates.innerHTML = `Postcode: ${this.postcode}`;
        divElement.appendChild(coordinates);


        document.getElementById('people').appendChild(divElement);
    }
}
