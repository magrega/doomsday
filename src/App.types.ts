export type TStory = {
    id: number;
    content: string;
    not_show: boolean;
    featured: boolean;
    time_created: string;
    time_updated: number;
}

export type TStoryData = {
    stories: [{
        id: number;
        content: string;
        not_show: boolean;
        featured: boolean;
        time_created: string;
        time_updated: number;
    }] | [],
    next_url: string | null;
} | undefined;
