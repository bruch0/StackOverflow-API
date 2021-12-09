class InvalidQuestion extends Error {
  constructor() {
    super('Questão inválida, cheque se os seus parâmetros estão corretos');
    this.name = 'invalidQuestion';
  }
}

export { InvalidQuestion };
