# EasyFit: Seu Parceiro de Dieta Descomplicado 🥗✨

**EasyFit** é um app open-source mega prático pra te ajudar a acompanhar e gerenciar sua dieta com um sorriso no rosto 😄. Com ele, você faz login ou cadastro só com seu e-mail, recebe um *magic link* e pronto: já pode configurar seu perfil, definir metas de calorias e registrar suas refeições de um jeito super intuitivo!

---

## O Que o EasyFit Faz? 🚀

Aqui vai um resumo das funcionalidades que vão te fazer amar o EasyFit:

### 🔐 **Login Mágico com E-mail**
- Cadastre-se ou faça login só com seu e-mail.
- Receba um *magic link* na sua caixa de entrada e entre sem complicação.

### 🧑‍🍳 **Seu Perfil, Suas Regras**
- Personalize seu nome e defina metas de calorias diárias e semanais.
- Tudo bem simples pra você focar no que importa!

### 🍽️ **Gerencie Suas Refeições com Estilo**
- **Cadastre refeições** com:
  - Nome (ex.: "Panqueca Turbinada")
  - Descrição (o que tem de gostoso nela?)
  - Calorias
  - Data e hora
  - Tipo (Café da manhã ☕, Almoço 🍲, Lanche da tarde 🥐 ou Janta 🌙)
- Veja tudo numa tabela esperta com busca, filtros por tipo e colunas ajustáveis.
- **CRUD completo**: crie, edite, visualize ou delete suas refeições.
- Exporte seus dados em PDF pra levar pra onde quiser 📄.

### 📊 **Dashboard Turbinado**
- Cards que mostram quantas calorias você consumiu no dia e na semana.
- Indicadores visuais pra acompanhar seu progresso com aquele toque de motivação 🚴‍♀️.

### 🔒 **Segurança e Performance**
- APIs protegidas só pra usuários logados.
- Limite de 50 requisições por minuto por usuário com o poder do Upstash Redis.

---

## Tecnologias que Dão Vida ao EasyFit 🛠️

O EasyFit foi construído com um combo de ferramentas modernas pra garantir uma experiência fluida:

### **Frontend** 🎨
- **Next.js** (App Router) pra uma navegação rapidinha.
- **React** porque componentes são vida.
- **Tailwind CSS** pra deixar tudo bonitão.
- **Vercel** pra deploy sem dor de cabeça.

### **Backend** ⚙️
- **Next.js API Routes** pra endpoints poderosos.
- **Prisma** + **MongoDB** pra um banco de dados que não te deixa na mão.
- **NextAuth** pro login via e-mail.
- **Upstash Redis** pra manter o ritmo com rate limiting.

### **Extras que Fazem a Diferença** ✨
- **Resend** pra enviar e-mails com estilo.
- **Sonner** pra toasts que aparecem na hora certa.

---

## Como Rodar o EasyFit na Sua Máquina 🖥️

Quer brincar com o EasyFit localmente? É moleza! Siga o passo a passo:

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/victorgomesl/easyfit.git
   cd easyfit
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**:
   - Crie um arquivo `.env.local` na raiz do projeto e cole isso (trocando pelos seus valores):
     ```env
     # NextAuth / Prisma
     MONGODB_URI=your-mongodb-connection-string
     NEXTAUTH_URL=http://localhost:3000
     NEXTAUTH_SECRET=sua_chave_secreta

     # Resend
     RESEND_API_KEY=sua_api_key
     EMAIL_FROM="Sender <sender@easyfit.com>"

     # Upstash Redis
     UPSTASH_REDIS_REST_URL=https://unbiased-seagull-19601.upstash.io
     UPSTASH_REDIS_REST_TOKEN=your-upstash-redis-password
     ```

4. **Rode o projeto**:
   ```bash
   npm run dev
   ```

5. **Acesse e divirta-se**:
   - Abra seu navegador em `http://localhost:3000` e bora testar! 🚀

---

## Onde o EasyFit Está Hospedado? 🌐

O app tá no ar e rodando lisinho na Vercel! Dá um pulo lá:  
👉 [https://easyfit.vercel.app](https://easyfit.vercel.app)

---

## Quer Contribuir? Vem com a Gente! 🤝

O EasyFit é um projeto colaborativo, e sua ajuda é mais que bem-vinda! Aqui algumas ideias pra você se jogar:

- 🐛 Reporte bugs ou sugira melhorias abrindo uma *issue*.
- 💻 Envie *pull requests* com correções ou novas funcionalidades.
- 📣 Compartilhe o projeto nas redes pra espalhar a palavra!
- **Como começar?** Faça um fork, crie uma branch com sua ideia e mande seu *pull request*.

---

## Licença 📜

O EasyFit é open-source e tá sob a **MIT License**. Isso significa que você pode usar, modificar e compartilhar à vontade, desde que siga as regras da licença.

---

Feito com 💚 pra te ajudar a comer bem e viver melhor!