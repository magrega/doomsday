import { TStories, TStory } from '../App.types';

let initialRequest = '?offset=0&limit=15';

const fetchData = async (url: string, method: string = 'GET', body?: string): Promise<any> => {
  try {
    const _api = 'https://lobster-app-qoium.ondigitalocean.app/story/';
    const options: RequestInit = { method, headers: { 'Content-Type': 'application/json' } };

    if (body) options.body = body;

    const response = await fetch(`${_api}${url}`, options);

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    return response.json();
  } catch (e) {
    throw new Error(`Error fetching data: ${(e as Error).message}`);
  }
};

export const getPosts = async (req: string = initialRequest): Promise<TStories> => {
  try {
    const responseBody = await fetchData(req);
    initialRequest = responseBody.next_url.replace('/story/', '');
    return responseBody;
  } catch (e) {
    throw new Error(`Error fetching posts: ${(e as Error).message}`);
  }
};

export const getPost = async (id: string): Promise<TStory> => {
  try {
    return fetchData(id);
  } catch (e) {
    throw new Error(`Error getting post: ${(e as Error).message}`);
  }
};

export const sendPost = async (body: string): Promise<TStory> => {
  try {
    return await fetchData('', 'POST', JSON.stringify({ content: body }));
  } catch (e) {
    throw new Error(`Error making a post: ${(e as Error).message}`);
  }
};
