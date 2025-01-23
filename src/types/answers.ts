import { TDeck } from "./deck";
import { TQuestion } from "./question";

export enum AnswersEnum {
    EASY = 'easy',
    GOOD = 'good',
    HARD = 'hard',
    AGAIN = 'again',
};

export type TAnswer = {
    questionId: TQuestion['id'];
    deckId: TDeck['id'];
    type: AnswersEnum;
};
