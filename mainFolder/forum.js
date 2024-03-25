document.addEventListener('DOMContentLoaded', function() {
    const topicList = document.getElementById('topic-list');
    const newTopicBtn = document.getElementById('new-topic-btn');
    const newTopicForm = document.getElementById('new-topic-form');
    const submitTopicBtn = document.getElementById('submit-topic-btn');
    const topicDiscussion = document.getElementById('topic-discussion');
    const backToTopicsBtn = document.getElementById('back-to-topics-btn');
    const commentContent = document.getElementById('comment-content');
    const submitCommentBtn = document.getElementById('submit-comment-btn');
    const commentsList = document.getElementById('comments-list');

    // Function to fetch topics from the server
    function fetchTopics() {
        fetch('http://www.herniserverjirka.rf.gd/fetch_topics.php') // Replace 'fetch_topics.php' with the actual endpoint to fetch topics from the server
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayTopics(data);
        })
        .catch(error => console.error('Error fetching topics:', error));
    }

    // Display list of topics
    function displayTopics(topics) {
        topicList.innerHTML = '';
        topics.forEach(topic => {
            const topicItem = document.createElement('div');
            topicItem.innerHTML = `<h3>${topic.title}</h3>`;
            topicItem.addEventListener('click', () => displayDiscussion(topic));
            topicList.appendChild(topicItem);
        });
    }

    // Fetch topics when the page loads
    fetchTopics();

    // Display individual topic discussion
    function displayDiscussion(topic) {
        topicDiscussion.style.display = 'block';
        topicList.style.display = 'none';
        newTopicForm.style.display = 'none';
        document.getElementById('discussion-title').textContent = topic.title;
        document.getElementById('discussion-content').textContent = topic.content;
        displayComments(topic.comments);
    }

    // Display comments
    function displayComments(comments) {
        commentsList.innerHTML = '';
        comments.forEach(comment => {
            const commentItem = document.createElement('div');
            commentItem.textContent = comment;
            commentsList.appendChild(commentItem);
        });
    }

    // Back to list of topics
    backToTopicsBtn.addEventListener('click', () => {
        topicDiscussion.style.display = 'none';
        topicList.style.display = 'block';
        newTopicForm.style.display = 'none';
    });

    // Show new topic form
    newTopicBtn.addEventListener('click', () => {
        topicList.style.display = 'none';
        topicDiscussion.style.display = 'none';
        newTopicForm.style.display = 'block';
    });

    // Submit new topic
    submitTopicBtn.addEventListener('click', () => {
        const title = document.getElementById('topic-title').value;
        const content = document.getElementById('topic-content').value;
        if (title && content) {
            const newTopic = { id: topics.length + 1, title, content, comments: [] };
            topics.push(newTopic);
            displayTopics();
            newTopicForm.style.display = 'none';
            topicList.style.display = 'block';
            saveTopicsToStorage();
        } else {
            alert('Please fill in both title and content.');
        }
    });

    // Submit new comment
    submitCommentBtn.addEventListener('click', () => {
        const comment = commentContent.value;
        if (comment) {
            const topicIndex = topics.findIndex(topic => topic.title === document.getElementById('discussion-title').textContent);
            if (topicIndex !== -1) {
                topics[topicIndex].comments.push(comment);
                displayComments(topics[topicIndex].comments);
                commentContent.value = '';
                saveTopicsToStorage();
            }
        } else {
            alert('Please enter a comment.');
        }
    });

    // Save topics to local storage
    function saveTopicsToStorage() {
        localStorage.setItem('forumTopics', JSON.stringify(topics));
    }

    // Initial display of topics
    displayTopics();
});


