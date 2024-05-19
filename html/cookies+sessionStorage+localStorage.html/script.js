
function savePosition() {
    sessionStorage.setItem('pageScrollPos', window.pageYOffset);
}


window.onload = function () {
    if (sessionStorage.getItem('pageScrollPos')) {
        window.scrollTo(0, parseInt(sessionStorage.getItem('pageScrollPos')));
    }
}


window.onbeforeunload = function () {
    sessionStorage.setItem('pageScrollPos', window.pageYOffset);
}

function saveFormData() {
    const form = document.getElementById('myForm');
    const data = {
        username: form.username.value,
        email: form.email.value
    };
    localStorage.setItem('formData', JSON.stringify(data));
    alert('Form data saved!');
}

function loadFormData() {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
        const formData = JSON.parse(savedData);
        const form = document.getElementById('myForm');
        form.username.value = formData.username;
        form.email.value = formData.email;
        alert('Form data loaded!');
    } else {
        alert('No saved data found.');
    }
}

function clearFormData() {
    localStorage.removeItem('formData');
    document.getElementById('myForm').reset();
    alert('Saved data cleared!');
}
