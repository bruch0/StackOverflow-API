class InvalidQuestion extends Error {
  constructor() {
    super('Questão inválida, cheque se os seus parâmetros estão corretos');
    this.name = 'invalidQuestion';
  }
}

class InvalidAnswer extends Error {
  constructor() {
    super('Resposta inválida, cheque se os seus parâmetros estão corretos');
    this.name = 'invalidAnswer';
  }
}

class QuestionAnswered extends Error {
  constructor() {
    super('Essa questão já foi respondida!');
    this.name = 'questionAnswered';
  }
}

class QuestionNotFound extends Error {
  constructor() {
    super('Essa questão não existe');
    this.name = 'questionNotFound';
  }
}

export { InvalidQuestion, InvalidAnswer, QuestionAnswered, QuestionNotFound };
