window.__testCalls = [];
window.__testRole = "admin";
window.__testUser = {
  id: "11111111-1111-4111-8111-111111111111",
  email: "teste@acervo.invalid",
  user_metadata: { nome: "Pessoa de teste" },
  app_metadata: {},
};
window.__testRecords = [
  {
    id: 1,
    versao: 1,
    situacao: "ATIVO",
    controle: "INDIVIDUAL",
    saldo: 1,
    minimo: 0,
    unidade: "unidade",
    criado_em: "2026-10-25T12:00:00Z",
    dados: {
      ambiente: "Sala Principal",
      categoria: "Tecnologia",
      item: "Monitor de teste",
      tipo: "PMC",
      codigo: "123456",
      estante: "",
      prateleira: "",
      observacao: "Registro fictício para teste.",
    },
  },
  {
    id: 2,
    versao: 1,
    situacao: "ATIVO",
    controle: "QUANTIDADE",
    saldo: 2,
    minimo: 5,
    unidade: "unidade",
    criado_em: "2026-10-24T12:00:00Z",
    dados: {
      ambiente: "Almoxarifado",
      categoria: "Material",
      item: "Papel de teste",
      tipo: "SEM_IDENTIFICACAO",
      codigo: "",
      estante: "A",
      prateleira: "1",
      observacao: "",
    },
  },
  {
    id: 3,
    versao: 1,
    situacao: "EMPRESTADO",
    controle: "INDIVIDUAL",
    saldo: 1,
    minimo: 0,
    unidade: "unidade",
    criado_em: "2026-10-23T12:00:00Z",
    emprestimo: {
      responsavel: "Pessoa fictícia",
      destino: "Sala de teste",
      momento: "2026-10-25T14:00:00Z",
    },
    dados: {
      ambiente: "Sala da Gerência",
      categoria: "Móvel",
      item: "Cadeira de teste",
      tipo: "ICI",
      codigo: "654321",
      estante: "",
      prateleira: "",
      observacao: "",
    },
  },
  {
    id: 4,
    versao: 1,
    situacao: "BAIXADO",
    controle: "INDIVIDUAL",
    saldo: 1,
    minimo: 0,
    unidade: "unidade",
    criado_em: "2026-10-22T12:00:00Z",
    baixa: { data: "2026-10-25", motivo: "Teste" },
    dados: {
      ambiente: "Almoxarifado",
      categoria: "Tecnologia",
      item: "Teclado descartado",
      tipo: "SEM_IDENTIFICACAO",
      codigo: "",
      estante: "B",
      prateleira: "2",
      observacao: "",
    },
  },
  {
    id: 5,
    versao: 1,
    situacao: "ARQUIVADO",
    controle: "INDIVIDUAL",
    saldo: 1,
    minimo: 0,
    unidade: "unidade",
    criado_em: "2026-10-21T12:00:00Z",
    dados: {
      ambiente: "Sala Principal",
      categoria: "Móvel",
      item: "Mesa arquivada",
      tipo: "SEM_IDENTIFICACAO",
      codigo: "",
      estante: "",
      prateleira: "",
      observacao: "",
    },
  },
];
window.__testPeople = [
  {
    ...window.__testUser,
    nome: "Pessoa de teste",
    perfil: "admin",
    primeiro_acesso: false,
  },
  {
    id: "22222222-2222-4222-8222-222222222222",
    nome: "Outra pessoa",
    email: "outra@acervo.invalid",
    perfil: "editor",
    primeiro_acesso: true,
  },
];
let authListener;
window.supabase = {
  createClient: (_url, _key, options) => ({
    auth: {
      getSession: async () => ({
        data: {
          session: window.__testRestoreSession
            ? { user: window.__testUser }
            : null,
        },
        error: null,
      }),
      signInWithPassword: async () => {
        const session = { user: window.__testUser };
        options.auth.storage.setItem(
          options.auth.storageKey,
          JSON.stringify(session),
        );
        return { data: { session }, error: null };
      },
      getUser: async () =>
        window.__testVerifyError
          ? {
              data: { user: null },
              error: { message: "Sessão de teste inválida" },
            }
          : { data: { user: window.__testUser }, error: null },
      signOut: async () => {
        options.auth.storage.removeItem(options.auth.storageKey);
        authListener?.("SIGNED_OUT");
        return { error: null };
      },
      onAuthStateChange: (fn) => {
        authListener = fn;
        return { data: { subscription: { unsubscribe() {} } } };
      },
    },
    rpc: async (name, args) => {
      window.__testCalls.push({ name, args });
      if (name === "acervo_ler_v3")
        return {
          data: {
            itens: structuredClone(window.__testRecords),
            conferencias: [],
            perfil: window.__testRole,
          },
          error: null,
        };
      if (name === "acervo_historico") return { data: [], error: null };
      return {
        data: null,
        error: { message: "Operação não simulada: " + name },
      };
    },
    functions: {
      invoke: async (name, { body }) => {
        window.__testCalls.push({ name, body });
        if (body.acao === "listar_usuarios")
          return {
            data: {
              ok: true,
              pessoas: window.__testPeople,
              total: window.__testPeople.length,
              pagina: 1,
              limite: 30,
            },
            error: null,
          };
        if (body.acao === "criar_usuario")
          return {
            data: { ok: true, ...body, senha_inicial: "Teste@123!!" },
            error: null,
          };
        return { data: { ok: true }, error: null };
      },
    },
  }),
};
