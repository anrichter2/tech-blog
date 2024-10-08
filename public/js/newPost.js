// // javascript file used on a dashboard.handlebars page to add a new post
const postButton = document.querySelector('#post-button');
const targetDiv = document.querySelector('.target-div');

// function for dynamically generating a form on the dashboard page that makes a new post
function handleMakePostForm(event) {
    event.preventDefault();

    const formEL = document.createElement('form');
    formEL.setAttribute('id', 'new-post-form');
    formEL.classList.add('my-3');

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('my-3');
    const labelElA = document.createElement('label');
    labelElA.setAttribute('for', 'post-title');
    labelElA.classList.add('form-label');
    labelElA.textContent = 'Title'
    const inputElA = document.createElement('input');
    inputElA.classList.add('form-input', 'form-control');
    inputElA.setAttribute('id', 'post-title');

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('my-3');
    const labelElB = document.createElement('label');
    labelElB.setAttribute('for', 'post-content');
    labelElB.classList.add('form-label');
    labelElB.textContent = 'Content'
    const textareaEl = document.createElement('textarea');
    textareaEl.classList.add('form-control');
    textareaEl.setAttribute('id', 'post-content');

    const buttonDiv = document.createElement('div');
    const postButton = document.createElement('button');
    postButton.classList.add('btn', 'btn-primary');
    postButton.setAttribute('type', 'submit');
    postButton.setAttribute('id', 'submit-post');
    postButton.textContent = 'Submit new post'

    targetDiv.appendChild(formEL);
    formEL.append(titleDiv, contentDiv, buttonDiv);
    titleDiv.append(labelElA, inputElA);
    contentDiv.append(labelElB, textareaEl);
    buttonDiv.appendChild(postButton);

    // createws new event listener for submitting the newly made form
    const postForm = document.querySelector('#new-post-form');
    postForm.addEventListener('submit', newPostHandler);
};

// arrow function to handle submitting the information of a new post
const newPostHandler = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();

    if (title && content) {
        const response = await fetch('/api/post/', {
            method: 'POST',
            body: JSON.stringify({ title, text: content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText)
        };
    };
};

postButton.addEventListener('click', handleMakePostForm)