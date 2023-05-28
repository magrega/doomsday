export type TStory = {
    id: number;
    content: string;
    not_show: boolean;
    featured: boolean;
    time_created: string;
    time_updated: number;
}

export type TStories = {
    stories: [TStory] | [],
    next_url: string | null;
};
