document.querySelectorAll('.delete').forEach(button => {
    button.addEventListener('click', async () => {
        const blogId = button.getAttribute('data-id');
        
        try {
            const response = await fetch(`/delete/${blogId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                window.location.reload(); 
            } else {
                console.error('Failed to delete the blog post');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
