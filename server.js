const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));


app.get('/servicos', (req, res) => {
    fs.readFile(path.join(__dirname, 'public', 'servicos.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao ler o arquivo JSON' });
        }
        res.json(JSON.parse(data));
    });
});

app.post('/adicionar-servico', (req, res) => {
    const novoServico = req.body;
    fs.readFile(path.join(__dirname, 'public', 'servicos.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao ler o arquivo JSON' });
        }
        let servicos = JSON.parse(data);
        servicos.push(novoServico);
        fs.writeFile(path.join(__dirname, 'public', 'servicos.json'), JSON.stringify(servicos, null, 2), 'utf8', (err) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao escrever no arquivo JSON' });
            }
            res.json({ message: 'Serviço adicionado com sucesso!' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
