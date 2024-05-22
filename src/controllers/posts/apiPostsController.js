
import Post from './models/postModel.js';


const getPost = (req, res) => {
  const title = 'Posts';
  Post
    .find()
    .then(posts => res.render('posts', { posts, title }))
    .catch(error => {
      console.log(error);
      res.render('error', { title: 'Error' });
    });
}

const createPost = (req, res) => {
  const author = req.user._id
  const { name, link } = req.body;
  const contact = new Post({ name, link, author });
  contact
    .save()
    .then(() => res.redirect('posts'))
    .catch((error) => {
      console.log(error);
      res.render(('error'), { title: 'Error' });
    }); 
}
const deletePost = (req, res) => {
  Contact
    .deleteMany()
    .then(() => res.redirect(createPath('posts')))
    .catch((error) => {
      console.log(error);
      res.render(('error'), { title: 'Error' });
    });}

const updatePost = (req, res) => {
  const { id } = req.params;
  const { name, link } = req.body;
  Contact
    .findByIdAndUpdate(id, { name, link })
    .then(() => res.redirect(('posts')))
    .catch((error) => {
      console.log(error);
      res.render(('error'), { title: 'Error' });
    });
}

module.exports = {
  getPost,
  createPost,
  deletePost,
  updatePost
};
