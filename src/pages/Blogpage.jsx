import {
  Link,
  useSearchParams,
  useLoaderData,
  Await,
  json,
} from 'react-router-dom';
import BlogFilter from '../components/BlogFilter';
import {Suspense} from 'react';

function Blogpage() {
  const {posts} = useLoaderData();

  const [searchParams, setSearchParams] = useSearchParams();

  const postQuery = searchParams.get('post') || '';
  const latest = searchParams.has('latest');

  const startsFrom = latest ? 80 : 1;

  return (
    <div>
      <h1>Our news</h1>
      <BlogFilter
        postQuery={postQuery}
        latest={latest}
        setSearchParams={setSearchParams}
      />
      <Link style={{margin: '2rem 0 2rem'}} to="/posts/new">
        Add new post
      </Link>
      <Suspense fallback={<h2>Loading...</h2>}>
        <Await resolve={posts}>
          {(resolvedPosts) => (
            <>
              {resolvedPosts
                .filter(
                  (post) =>
                    post.title.includes(postQuery) && post.id >= startsFrom,
                )
                .map((post) => (
                  <Link className="news" key={post.id} to={`/posts/${post.id}`}>
                    <li>{post.title}</li>
                  </Link>
                ))}
            </>
          )}
        </Await>
      </Suspense>
    </div>
  );
}

async function getPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');

  // if (!res.ok) {
  //   throw new Response('', {
  //     status: res.status,
  //     statusText: 'Error get posts',
  //   });
  // }
  return res.json();
}

const blogLoader = async () => {
  const posts = await getPosts();
  console.log('posts: ', posts);
  if (!posts.length) {
    throw json({message: 'Not found', reason: 'Wrong url'}, {status: 404});
  }
  return {
    posts: getPosts(),
  };
};

export {Blogpage, blogLoader};
