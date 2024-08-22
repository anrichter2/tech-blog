// javascript file used on a post.handlebars page to add a comment to a post
const newCommentForm = async (event) => {
    event.preventDefault();
    const comment = document.querySelector('#post-comment').value.trim();
    const id = event.target.getAttribute('data-id');

    if (comment) {
        const response = await fetch(`/api/comment/${id}`, {
            method: 'POST',
            body: JSON.stringify({ comment_text: comment }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace(`/post/${id}`);
        } else {
            alert(response.statusText)
        }
    }
};

document.querySelector('#comment-form').addEventListener('submit', newCommentForm);