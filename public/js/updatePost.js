// // javascript file used on a post.handlebars page to update or delete a post made by the logged in user
// arrow function for updating a post
const updatePosthandler = async (event) => {
    event.preventDefault();

    const updateTitle = document.querySelector('#update-title').value.trim();
    const updateText = document.querySelector('#update-text').value.trim();
    const id = event.target.getAttribute('data-id');

    // if both variables have values it starts a PUT fetch request
    if (updateTitle && updateText) {
        const response = await fetch(`/api/post/${id}`, {
          method: 'PUT',
          body: JSON.stringify({ title: updateTitle, text: updateText }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        // takes you back to dashboard if successful
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          alert('Failed to update post');
        }
      }
}

// arrow function for deleting a post
const deletePosthandler = async (event) => {
    event.preventDefault();
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/post/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete project');
        }
    };
};

// Event listeners for updating or deleting
document.querySelector('#update-form').addEventListener('submit', updatePosthandler);

document.querySelector('#delete-post-button').addEventListener('click', deletePosthandler);