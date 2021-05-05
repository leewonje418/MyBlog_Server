import Post from '../entity/post';
import PostDTO from '../dto/post.dto';
import PostRepository from '../repository/post.repository';
import { getCustomRepository } from 'typeorm';

export default class PostService {
    getPosts = async (): Promise<Post[]> => {
        const postRepository: PostRepository = getCustomRepository(PostRepository);
        const posts: Post[] = await postRepository.find();
        return posts;
    }

    getPost = async (id: number): Promise<Post | undefined> => {
        const postRepository: PostRepository = getCustomRepository(PostRepository);
        const post: Post | undefined = await postRepository.findOne(id);

        return post;
    }

    create = async (postRequest: PostDTO): Promise<Post> => {
        const postRepository: PostRepository = getCustomRepository(PostRepository);
        const { title, content, image, creator } = postRequest;

        const post: Post = new Post();
        post.userEmail = creator;
		post.title = title;
        post.content = content;
        post.image = image;

        const newPost: Post = await postRepository.save(post);
        
        return newPost;
    }

    update = async (id: number, postRequest: PostDTO): Promise<Post> => {
        const postRepository: PostRepository = getCustomRepository(PostRepository);
        const { title, content, image } = postRequest;

        const post: Post = new Post();
        post.idx = id;
		post.title = title;
        post.content = content;
        post.image = image;

        const newPost: Post = await postRepository.save(post);
        
        return newPost;
    }

    delete = async (id: number) => {
        const postRepository: PostRepository = getCustomRepository(PostRepository);
        await postRepository.delete(id);
    }
}