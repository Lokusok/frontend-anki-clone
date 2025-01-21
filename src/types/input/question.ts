export type TQuestionInput = {
    deckId: number | string;
    front: string;
    back: string;
    tags: string[];
};

export type TQuestionsGetInput = {
    deckId: number | string;
    askReady?: boolean;
};
