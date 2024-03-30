import NewPost from '../components/NewPost';
import {useAuth} from '../hook/useAuth';
import {useNavigate, redirect, useNavigation} from 'react-router-dom';

const Createpost = () => {
  const {signout} = useAuth();
  const navigate = useNavigate();
  const navigation = useNavigation();
  return (
    <div>
      <h1>Create a post</h1>
      <NewPost submitting={navigation.state === 'submitting'} />
      <button onClick={() => signout(() => navigate('/', {replace: true}))}>
        Log Out
      </button>
    </div>
  );
};

const createPost = async ({title, body, userId}) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({title, body, userId}),
  });
  console.log('response', response);
  const newPost = await response.json();
  return newPost;
};

const createPostAction = async ({request}) => {
  const formData = await request.formData();
  console.log('formData: ', formData);
  const newPost = {
    title: formData.get('title'),
    body: formData.get('body'),
    userId: formData.get('userId'),
  };
  const post = await createPost(newPost);
  console.log('post: ', post);

  return redirect('/posts' + post.id);
};

export {Createpost, createPostAction};
