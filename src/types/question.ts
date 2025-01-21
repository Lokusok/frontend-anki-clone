export type TQuestion = {
    id: number | string;
    front: string;
    back: string;
    deck_id: number | string;
    tags: Array<{ title: string }>;
    when_ask: string;
    created_at: string;
};
