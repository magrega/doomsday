import { TStoryData } from '../App.types';

const _api = 'https://lobster-app-qoium.ondigitalocean.app';
let initialRequest = `/story/?offset=0&limit=15`;

export const getPosts = async (req: string = initialRequest): Promise<TStoryData> => {
    
    try {
        const responsePosts = await fetch(`${_api}${req}`);

        if (!responsePosts.ok) throw new Error(`HTTP error! status: ${responsePosts.status}`);

        const responseBody = responsePosts.json();        
        await responseBody.then(body => {
            initialRequest = body.next_url;
        });

        return responseBody;
    } catch (e) {
        throw new Error(`Error fetching posts: ${(e as Error).message}`);
    }
}

export const sendPost = async (body: string) => {
    
    try {
        const responsePosts = await fetch(`${_api}/story/`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ content: body })
          })

        if (!responsePosts.ok) throw new Error(`HTTP error! status: ${responsePosts.status}`);

        return responsePosts;

    } catch (e) {
        throw new Error(`Error making a post: ${(e as Error).message}`);
    }
}