import mongoose from 'mongoose';
import Post from '../../src/models/postModel.js';

describe('Post Model', () => {
  // Перевірка наявності обов'язкових полів
  test('should have required fields', () => {
    const post = new Post();

    const validationResult = post.validateSync();
    const { errors } = validationResult;

    expect(errors.text.properties.type).toEqual('required');
    expect(errors.title.properties.type).toEqual('required');
    expect(errors.author.properties.type).toEqual('required');
  });

  // Перевірка створення поста
  test('should create a new post', async () => {
    const postData = {
      text: 'Test post',
      title: 'Test title',
      author: 'Test author'
    };

    const post = await Post.create(postData);

    expect(post.text).toBe(postData.text);
    expect(post.title).toBe(postData.title);
    expect(post.author).toBe(postData.author);
  });

  // Перевірка наявності часових міток
  test('should have timestamps', () => {
    const timestamps = Post.schema.timestamps;

    expect(timestamps).toEqual(true);
  });

  // Перевірка оновлення часових міток
  test('should update timestamps', async () => {
    const postData = {
      text: 'Test post',
      title: 'Test title',
      author: 'Test author'
    };

    const post = await Post.create(postData);

    const updatedAtBeforeUpdate = post.updatedAt;

    // Змінюємо дані поста
    post.text = 'Updated post';
    await post.save();

    // Перевіряємо, чи змінилася часова мітка оновлення
    const updatedPost = await Post.findById(post._id);
    const updatedAtAfterUpdate = updatedPost.updatedAt;

    expect(updatedAtAfterUpdate).not.toBe(updatedAtBeforeUpdate);
  });
});
