import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addPost,
  editPost,
  deletePost,
} from "../../redux-toolkit/postsSlice/postsSlice";
import "./Posts.css";

function Posts() {
  const [currentValues, setCurrentValues] = useState({
    title: "",
    description: "",
  });
  const [updatedValues, setUpdatedValues] = useState({
    updatedTitle: "",
    updatedDescription: "",
  });
  const [isUpdated, setIsUpdated] = useState(false);
  const [postId, setPostId] = useState(null);
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addPost({ id: Math.random(), ...currentValues }));
    setCurrentValues({ title: "", description: "" });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentValues({
      ...currentValues,
      [name]: value,
    });
  };
  const handleUpdatedChange = (e) => {
    const { name, value } = e.target;
    setUpdatedValues({
      ...updatedValues,
      [name]: value,
    });
  };
  const handleEdit = (postId) => {
    setIsUpdated(true);
    setPostId(postId);
  };

  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    dispatch(editPost({ id: postId, ...updatedValues }));
    setUpdatedValues({ updatedTitle: "", updatedDescription: "" });
    setIsUpdated(false);
  };
  return (
    <>
      <section className='add__posts'>
        <form onSubmit={handleSubmit}>
          <div className='inputs__wrapper'>
            <div className='input__wrapper'>
              <label htmlFor='input__title'>Title</label>
              <input
                id='input__title'
                type='text'
                placeholder='Add Title'
                onChange={handleChange}
                value={currentValues.title}
                name='title'
              />
            </div>
            <div className='input__wrapper'>
              <label htmlFor='input__description'>Description</label>
              <input
                id='input__description'
                type='text'
                placeholder='Add Description'
                onChange={handleChange}
                value={currentValues.description}
                name='description'
              />
            </div>
          </div>
          <div className='submit__buttonWrapper'>
            <button>Submit</button>
          </div>
        </form>
      </section>
      <section className='show__posts'>
        {posts?.map((post) => {
          return (
            <div className='post__infoWrapper' key={post.id}>
              <div className='post__info'>
                <h2>{post.title}</h2>
                <p>{post.description}</p>
                <button onClick={() => handleEdit(post.id)}>Edit</button>
                <button onClick={() => dispatch(deletePost(post))}>
                  Delete
                </button>
              </div>
              {isUpdated && post.id === postId && (
                <div className='post__update'>
                  <form onSubmit={handleSubmitUpdate}>
                    <div className='inputs__wrapper'>
                      <div className='input__wrapper'>
                        <input
                          type='text'
                          placeholder='Edit Title'
                          onChange={handleUpdatedChange}
                          value={updatedValues.updatedTitle}
                          name='updatedTitle'
                        />
                      </div>
                      <div className='input__wrapper'>
                        <input
                          type='text'
                          placeholder='Edit Description'
                          onChange={handleUpdatedChange}
                          value={updatedValues.updatedDescription}
                          name='updatedDescription'
                        />
                      </div>
                    </div>
                    <div className='update__buttonWrapper'>
                      <button>Update</button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          );
        })}

        {!posts.length && <h3>There Is No Posts</h3>}
      </section>
    </>
  );
}

export default Posts;
