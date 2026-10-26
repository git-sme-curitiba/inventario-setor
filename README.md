# ACERVO

Aplicação web para gestão de bens e materiais: cadastro individual e por quantidade, localização, empréstimos, descartes, histórico e exportação para Excel. Interface em português, adaptada para computador e celular.

## Executar localmente

Requer Node.js 22 ou superior para as ferramentas de desenvolvimento.

```sh
npm ci
npm start
```

Abra `http://127.0.0.1:8080`. A aplicação publicada continua estática e não exige compilação nem Node.js no servidor. O servidor local disponibiliza somente os arquivos públicos da aplicação.

## Verificar alterações

```sh
npm run check
npx playwright install chromium
npm test
```

Os testes usam um cliente Supabase simulado, dados fictícios e bloqueio das requisições ao backend real. Cobrem consulta, sugestões por teclado, pop-ups responsivas, gestão de pessoas, restrições de perfil e encerramento de sessão. As bibliotecas de Excel e OCR são carregadas pelo CDN, como na aplicação publicada; é necessário acesso à internet.

Para usar o Microsoft Edge instalado durante os testes: `PLAYWRIGHT_CHANNEL=msedge node --test tests/app.test.cjs`. No Windows, defina a variável de ambiente com a sintaxe do seu terminal.

## Organização

| Arquivo            | Responsabilidade                                                                |
| ------------------ | ------------------------------------------------------------------------------- |
| `index.html`       | Estrutura da página, formulários, ícones e política de conteúdo                 |
| `aplicacao.js`     | Sessão, regras da interface, operações, câmera, Excel e componentes responsivos |
| `estilos.css`      | Identidade visual Safira e layouts de computador e celular                      |
| `site.webmanifest` | Nome, cores e ícones da aplicação instalada                                     |
| `scripts/`         | Servidor local e verificações estáticas                                         |
| `tests/`           | Testes da interface com backend simulado                                        |

## Backend e publicação

A aplicação depende do projeto Supabase configurado em `aplicacao.js`. A chave `sb_publishable_…` é pública; permissões e validações de dados devem ser aplicadas no servidor. Nunca inclua chaves secretas ou `service_role` neste repositório.

O backend precisa disponibilizar as funções RPC `acervo_ler_v3`, `acervo_gravar_v3`, `acervo_historico` e `acervo_excluir_item`, além da Edge Function `acervo-acessos`. SQL, políticas de acesso e implementação dessa Edge Function não estão neste repositório. Os testes locais validam a interface com os contratos simulados; a configuração do backend precisa de verificação separada.

O GitHub Pages publica os arquivos estáticos da raiz conforme a configuração do repositório. Ao alterar uma versão, atualize `package.json` e os parâmetros `?v=` do HTML e do manifesto em conjunto. O workflow de verificação executa em pushes e pull requests.

## Manutenção 3.5.76

- Removidos os caminhos incompletos de demonstração e dados fictícios do código de produção.
- Consolidada a montagem das pop-ups e retirada a remontagem antiga em mudanças de largura.
- Retirados seletores obsoletos, declarações repetidas e uma animação sem elemento consumidor.
- Unificada a identificação das versões dos recursos e corrigida a navegação por teclado nas sugestões de itens.
- Corrigido o estilo que exibia o botão de gestão de pessoas mesmo quando oculto para perfis sem permissão.
- Tratada a falha de verificação de uma sessão salva, com retorno legível à tela de entrada.
- Adicionados documentação, verificações e testes reproduzíveis.

© Gabriel Santiago Cândido. Todos os direitos reservados.
