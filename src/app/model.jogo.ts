// export interface Jogo {
//   uid: string;
//   email: string;
//   photoURL?: string;
//   displayName?: string;
// }

export class Jogo {
  constructor(
    // public descricao: string = '',
    // public cadastrador: string = '',
    // public responsavel: string = '',
    // public tipo: string = '',
    // public assunto: string = '',
    // public trelloID: string = '',
    // public imagem: string = '',
    // public urgente: boolean = false,
    // public email: string = '',
    // public geolocalizacao: string = '',
    // public nota: number = 0,
    // public resolvido: boolean = false,
    // public local: string = '',

    public jogoID: string = "",
    public player1: string = "",
    public player2: string = "",
    public c1: string = "",
    public c2: string = "",
    public c3: string = "",
    public c4: string = "",
    public c5: string = "",
    public c6: string = "",
    public c7: string = "",
    public c8: string = "",
    public c9: string = "",
    public suavez: boolean = false,
    public ultimoGanhado: string = "",
    public p1: number = 0,
    public p2: number = 0,

  ) { }
}

