var input = document.querySelector('input')

function getUsers(event) {
    var request = new XMLHttpRequest
    if (event.keyCode === 13) {
        var content = input.value
        input.value = ''
        request.open('GET', `https://api.github.com/search/users?q=${content}&per_page=20`)
        request.onload = function () {
            var data = JSON.parse(request.responseText).items;
            createUser(data);
            // console.log(data);
        }
        request.send()
    }
}

input.addEventListener('keypress', getUsers)

function createUser(data) {
    for (let i = 0; i < data.length; i++) {
        const contain = document.querySelector('.container')
        const row = document.querySelector('.row')
        const main = document.createElement('div')
        main.setAttribute('class', 'col-4')
        const image = document.createElement('img')
        image.setAttribute('src', data[i].avatar_url)
        const profile_url = document.createElement('a')
        profile_url.setAttribute('href', data[i].html_url)
        profile_url.setAttribute('target', '_blank')
        profile_url.innerText = '@' + data[i].login
        contain.appendChild(row)
        row.appendChild(main)
        main.appendChild(image)
        main.appendChild(profile_url)
    }
}

// Each user in the list is clickable.
// When user clicked new content (or new page) is presented.
// Show all github repositories of selected user (in list of grid).
// When showing repository you should present:
// Repository name
// Repository image, or some placeholder if there is no picture
// Description
// Number of start
// API documentation for GitHub repositories: https://developer.github.com/v3/repos/
// Extra:
// For each repository show used languages on that repository