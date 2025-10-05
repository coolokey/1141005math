
export enum GameState {
  Start,
  Playing,
  GameOver,
}

export enum Operation {
  Add = '+',
  Subtract = '-',
  Multiply = '×',
  Divide = '÷',
}

export interface Question {
  text: string;
  answer: number;
}
