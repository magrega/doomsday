
const _api = "https://dummyjson.com";

export const getPosts = async (): Promise<Response> => {
    try {
        const responsePosts = await fetch(`${_api}/posts?limit=10`);

        if (!responsePosts.ok) {
            throw new Error(`HTTP error! status: ${responsePosts.status}`);
        }

        return responsePosts;
    } catch (e) {
        throw new Error(`Error fetching posts: ${(e as Error).message}`);
    }
}

export type TPost = {
    body: string;
    id: number;
    title: string;
    userId: number;
}

export const getRandomPost = async(): Promise<TPost> => {

    const randomNum = Math.floor((Math.random() * 150) + 1);
    console.log(randomNum);
    

    try {
        const responsePost = await fetch(`${_api}/posts/${randomNum}`);

        if (!responsePost.ok) {
            throw new Error(`HTTP error! status: ${responsePost.status}`);
        }
        
        return responsePost.json();
    } catch (e) {
        throw new Error(`Error fetching posts: ${(e as Error).message}`);
    }
}