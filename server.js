const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// --- CONFIGURAÇÕES PARA EJS E DADOS ---
app.set('views', path.join(__dirname));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

const atividadesPortugues1Ano = require('./data/atividades_portugues_1_ano');
// --- FIM DAS CONFIGURAÇÕES ---


// --- DEFINIÇÃO DE ROTAS DINÂMICAS ---
// Estas rotas devem vir ANTES da configuração de arquivos estáticos

// Rota para a página inicial (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para a página do 1º Ano (1_ano.html)
app.get('/1_ano.html', (req, res) => {
    res.sendFile(path.join(__dirname, '1_ano.html'));
});

// Rota para Português 1º Ano - AGORA PROCESSA COM EJS E ENVIA OS DADOS
app.get('/portugues_1_ano.html', (req, res) => {
    res.render('portugues_1_ano', { atividades: atividadesPortugues1Ano });
});

// --- NOVA ROTA PARA EXIBIR O PREVIEW DA ATIVIDADE ---
// Esta é a rota que você deve ADICIONAR.
app.get('/preview_atividade', (req, res) => {
    // Pega o ID da atividade da URL (ex: ?id=pt1a_atv001)
    const atividadeId = req.query.id; 

    // Encontra a atividade correspondente nos dados
    const atividade = atividadesPortugues1Ano.find(ativ => ativ.id === atividadeId);

    if (atividade) {
        // Se a atividade for encontrada, renderiza uma nova página de preview (que criaremos a seguir)
        res.render('preview_atividade', { atividade: atividade });
    } else {
        // Se a atividade não for encontrada, exibe uma mensagem de erro simples
        res.status(404).send('Atividade não encontrada.');
    }
});
// --- FIM DA NOVA ROTA ---


// --- SERVINDO ARQUIVOS ESTÁTICOS ---
app.use(express.static(path.join(__dirname)));


// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
    console.log('Pressione Ctrl+C para parar o servidor');
});
