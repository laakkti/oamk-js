class Person {

  constructor(lastName, firstName, phoneNumber, birthYear) {
    this._lastName = lastName;
    this._firstName = firstName;
    this._phoneNumber = phoneNumber;
    this._birthYear = birthYear;
  }

  set lastName(lastName) {

    this._lastName = lastName;
  }

  get lastName() {

    return this._lastName;
  }

  set firstName(firstName) {

    this._firstName = firstName;
  }

  get firstName() {

    return this._firstName;
  }

  set phoneNumber(phoneNumber) {

    this._phoneNumber = phoneNumber;
  }

  get phoneNumber() {

    return this._phoneNumber;
  }

  set birthYear(birthYear) {

    this._birthYear = birthYear;
  }

  get birthYear() {

    return this._birthYear;
  }

  getName() {
    return (this.lastName + ', ' + this.firstName);
  }

  getAge() {
    let currentYear = parseInt(new Date().getFullYear());
    return (currentYear - parseInt(this._birthYear));
  }

};

const phoneBook = {

  allPersons: [],

  add: function (person) {

    this.allPersons.push(person);
  },

  remove: function (index) {

    if (index !== null) {
      this.allPersons.splice(index, 1);
    }
  },

  update: function (person, index) {
    if (index !== null) {
      this.allPersons[index] = person;
    }
  },

  clear: function () {

    this.allPersons = [];
  },

  count: function () { return this.allPersons.length; },

  averageAge: function () {

    let sum = 0;
    this.allPersons.forEach(person => {

      sum += person.getAge();

    });

    return Math.round(sum / this.count());
  }

};


const lastNameFld = document.getElementById("lastName");
const firstNameFld = document.getElementById("firstName");
const phoneNumberFld = document.getElementById("phoneNumber");
const birthYearFld = document.getElementById("birthYear");
const nameFld = document.getElementById("_friend");
const phoneFld = document.getElementById("_phone");
const birthYearFld2 = document.getElementById("_birthYear");
const ageFld = document.getElementById("_age")
const allFriendsFld = document.getElementById("allFriends");
const statsFld = document.getElementById("stats");

let editMode = false;
let selectedIndex = null;

const clearInputFields = () => {

  lastNameFld.value = '';
  firstNameFld.value = '';
  phoneNumberFld.value = '';
  birthYearFld.value = '';
}

const clearDetailsFields = () => {

  nameFld.value = '';
  phoneFld.value = '';
  birthYearFld2.value = '';
  ageFld.value = '';
}

const showDetails = (index) => {

  selectedIndex = index; // tarvitaan kun talletetaan muutos
  let person = phoneBook.allPersons[selectedIndex];

  nameFld.value = person.getName();
  phoneFld.value = person.phoneNumber;
  birthYearFld2.value = person.birthYear;
  ageFld.value = person.getAge();
  disableGroup(false, false, false);
}

const updateFriendsList = () => {

  allFriendsFld.innerHTML = '';

  phoneBook.allPersons.forEach((person, index) => {

    allFriendsFld.innerHTML += `<li onClick="showDetails(${index})">` + person.lastName + ', ' + person.firstName + '</li>'

  });

  statsFld.innerHTML = `Average age: ${phoneBook.averageAge().toString()}` + '<br>' + `Number of friends: ${phoneBook.count().toString()}`;
}

const save = () => {

  if (lastNameFld.value === '') {
    alert("Insert lastname")
  } else if (firstNameFld.value === '') {
    alert("Insert firstname")
  } else if (phoneNumberFld.value === '') {
    alert("Insert phonenumber")
  } else if (birthYearFld.value === '') {
    alert("Insert birthyear")
  } else {

    let person = new Person(lastNameFld.value, firstNameFld.value, phoneNumberFld.value, parseInt(birthYearFld.value));

    if (editMode) {
      phoneBook.update(person, selectedIndex);
      editMode = false;
      selectedIndex = null;
    } else {
      phoneBook.add(person);
    }
    updateFriendsList();
    disableGroup(true, true, false);

    clearInputFields();
    clearDetailsFields();
  }
}

const cancel = () => {

  editMode = false;
  clearInputFields();
  clearDetailsFields();
  disableGroup(true, true, false);
  selectedIndex = null;
}

const remove = () => {

  phoneBook.remove(selectedIndex);
  clearDetailsFields();
  updateFriendsList();
  disableGroup(true, true, false);
  selectedIndex = null;
}

const edit = () => {

  let person = phoneBook.allPersons[selectedIndex]

  lastNameFld.value = person.lastName;
  firstNameFld.value = person.firstName;
  phoneNumberFld.value = person.phoneNumber;
  birthYearFld.value = person.birthYear;

  editMode = true;
  clearDetailsFields();
  disableGroup(true, true, true);
}

const disableGroup = (remove, edit, allFriends) => {

  disable('remove', remove);
  disable('edit', edit);
  disable('allFriends', allFriends);
}

const disable = (elementName, enable) => {

  const element = document.getElementById(elementName);
  if (element.nodeName !== 'UL') {

    element.disabled = enable;
  } else {

    if (enable) {
      element.style.pointerEvents = "none";
    } else {
      element.style.pointerEvents = "auto";
    }
  }
}

const startData = () => {

  phoneBook.clear(); // tätä ei välttämättä nyt tarvita, button-käytössä kyllä 
  phoneBook.add(new Person('Puupää', 'Pekka', '+358401234567', 1960));
  phoneBook.add(new Person('Olematon', 'Oskari', '+358507654321', 1950));
  phoneBook.add(new Person('Meikäläinen', 'Matti', '+358461112223', 1996));
  updateFriendsList();
  disableGroup(true, true, false);
}