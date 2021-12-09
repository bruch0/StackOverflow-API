class InvalidUser extends Error {
  constructor() {
    super('Usuário inválido, cheque se os seus parâmetros estão corretos');
    this.name = 'invalidUser';
  }
}

export { InvalidUser };
