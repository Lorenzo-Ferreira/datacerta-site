# Data Certa — Site Explicativo

## Como rodar localmente

### Opção 1 — Abrir direto no navegador (mais simples)
Abra o arquivo `index.html` diretamente no seu navegador (Google Chrome, Firefox, Edge...).

> ⚠️ As fontes do Google Fonts precisam de internet para carregar. Se estiver offline, o site funciona normalmente mas usa uma fonte genérica como fallback.

### Opção 2 — Servidor local (recomendado para melhor experiência)

**Com Python (já vem instalado no Windows 10/11 e macOS):**
```bash
# No terminal, entre na pasta do projeto:
cd datacerta-site

# Python 3:
python -m http.server 8080

# Python 2 (versões mais antigas):
python -m SimpleHTTPServer 8080
```
Depois abra: http://localhost:8080

**Com Node.js:**
```bash
npx serve .
```

**Com VS Code:**
Instale a extensão "Live Server" e clique em "Go Live" no canto inferior direito.

---

## Estrutura de arquivos

```
datacerta-site/
├── index.html      ← Página pública (consumidores e visitantes)
├── tecnico.html    ← Página técnica (banca avaliadora)
├── style.css       ← Estilos compartilhados entre as duas páginas
├── tecnico.css     ← Estilos específicos da página técnica
├── script.js       ← Animações e interatividade
└── README.md       ← Este arquivo
```

---

## Como publicar online (grátis)

### Opção 1 — Netlify Drop (mais fácil, sem criar conta)
1. Acesse https://app.netlify.com/drop
2. Arraste a pasta `datacerta-site` inteira para a área indicada
3. Pronto! O site fica online em segundos com uma URL como `random-name.netlify.app`
4. Você pode personalizar o nome do subdomínio gratuitamente

### Opção 2 — GitHub Pages
1. Crie uma conta em github.com
2. Crie um repositório público chamado `datacerta-site`
3. Faça upload dos arquivos (botão "Add file" → "Upload files")
4. Vá em Settings → Pages → selecione branch `main` → Save
5. O site fica disponível em `seu-usuario.github.io/datacerta-site`

### Opção 3 — Vercel (melhor performance)
1. Crie conta em vercel.com
2. Clique em "Add New Project" → "Import" → faça upload da pasta
3. O site fica online com HTTPS automático

---

## Para conectar seu domínio datacerta.com.br

Após publicar em qualquer uma das opções acima:
1. Acesse o painel da plataforma (Netlify/Vercel/GitHub Pages)
2. Vá em "Custom Domain" ou "Domínios"
3. Adicione `datacerta.com.br`
4. A plataforma vai fornecer registros DNS para você configurar no seu registrador de domínio

---

## Personalização

### Trocar o slogan ou textos:
Edite o arquivo `index.html` — os textos estão diretamente no HTML, sem necessidade de banco de dados.

### Trocar cores:
Edite o início do `style.css`, na seção `:root { ... }`:
- `--red: #C0392B` → cor principal (vermelho)
- `--dark: #1A1A2E` → cor escura (herói e rodapé)

### Adicionar fotos reais:
Substitua os emojis nas seções de produto por tags `<img>`:
```html
<!-- Antes: -->
<div class="feat-icon">🏪</div>

<!-- Depois: -->
<img src="assets/foto-mercado.jpg" alt="Mercado parceiro" style="width:40px;height:40px;object-fit:cover;border-radius:8px"/>
```

---

Desenvolvido como projeto escolar — FUNEC Riacho · Contagem, MG · 2026
