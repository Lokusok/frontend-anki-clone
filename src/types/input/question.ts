import { TDeck } from "../deck";
import { TQuestion } from "../question";

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

export type TQuestionDeleteInput = {
    deckId: TDeck['id'];
    questionId: TQuestion['id'];
};

export type TQuestionsSearch = {
    deckId: TDeck['id'][];
    tags: string[];
    query: string;
};
