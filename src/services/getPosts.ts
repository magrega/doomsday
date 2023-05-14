import { TStory, TStoryData } from '../App.types';

const _api = 'https://lobster-app-qoium.ondigitalocean.app';
let initialRequest = `/story/?offset=0&limit=5`;

export const getPosts = async (req: string = initialRequest): Promise<TStoryData> => {
    
    try {
        const responsePosts = await fetch(`${_api}${req}`);

        if (!responsePosts.ok) {
            throw new Error(`HTTP error! status: ${responsePosts.status}`);
        }

        const responseBody = responsePosts.json();        
        await responseBody.then(body => {
            // if (body.next_url === null) return;
            initialRequest = body.next_url;
            console.log(initialRequest);
            
        });

        return responseBody;
    } catch (e) {
        throw new Error(`Error fetching posts: ${(e as Error).message}`);
    }
}

export const getRandomPost = async (): Promise<TStory> => {
    const randomNum = Math.floor((Math.random() * 150) + 1);
    try {
        const responsePost = await fetch(`${_api}/posts/${randomNum}`);

        if (!responsePost.ok) {
            throw new Error(`HTTP error! status: ${responsePost.status}`);
        }

        return responsePost.json();
    } catch (e) {
        throw new Error(`Error fetching random post: ${(e as Error).message}`);
    }
}

export const getUser = async (userId: number): Promise<{ username: string }> => {
    try {
        const responsePost = await fetch(`${_api}/users/${userId}`);

        if (!responsePost.ok) {
            throw new Error(`HTTP error! status: ${responsePost.status}`);
        }

        return responsePost.json();
    } catch (e) {
        throw new Error(`Error fetching user: ${(e as Error).message}`);
    }
}


