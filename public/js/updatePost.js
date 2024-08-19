const updatePosthandler = async (event) => {
    event.preventDefault();

    const updateTitle = document.querySelector('#update-title').value.trim();
    const updateText = document.querySelector('#update-text').value.trim();
    const id = event.target.getAttribute('data-id');

    if (updateTitle && updateText) {
        const response = await fetch(`/api/post/${id}`, {
          method: 'PUT',
          body: JSON.stringify({ title: updateTitle, text: updateText }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          alert('Failed to update post');
        }
      }
}

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

document.querySelector('#update-form').addEventListener('submit', updatePosthandler);

document.querySelector('#delete-post-button').addEventListener('click', deletePosthandler);