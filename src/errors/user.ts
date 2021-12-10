class InvalidUser extends Error {
  constructor() {
    super('Usuário inválido, cheque se os seus parâmetros estão corretos');
    this.name = 'invalidUser';
  }
}

class UserNotFound extends Error {
  constructor() {
    super('Usuário inválido, cheque se os seus parâmetros estão corretos');
    this.name = 'userNotFound';
  }
}

export { InvalidUser, UserNotFound };
