const express = require("express");
const mysql = require("mysql2");
const { engine } = require('express-handlebars');

const app = express();

app.use("/bootstrap", express.static("./node_modules/bootstrap/dist"));
app.use("/css", express.static("./css"));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "projeto_node"
});

conexao.connect((erro) => {
    if (erro) {
        throw erro;
    }
    console.log("Conexão bem sucedida.");
});

app.get("/", (request, response) => {
    const sql = "SELECT * FROM grupos";
    conexao.query(sql, (erro, retorno) => {
        if (erro) {
            throw erro;
        }
        response.render("cadastro", { grupos: retorno });
    });
});

app.get("/buscar-produtos", (request, response) => {
    let sql = 'SELECT * FROM produtos WHERE 1=1';
    const filters = [];

    if (request.query.codigo) {
        sql += ' AND codigo = ?';
        filters.push(request.query.codigo);
    }

    if (request.query.nome) {
        sql += ' AND nome LIKE ?';
        filters.push(`%${request.query.nome}%`);
    }

    if (request.query.descricao) {
        sql += ' AND descricao LIKE ?';
        filters.push(`%${request.query.descricao}%`);
    }

    if (request.query.codigo_grupo) {
        sql += ' AND codigo_grupo = ?';
        filters.push(request.query.codigo_grupo);
    }

    conexao.query(sql, filters, (erro, produtos) => {
        if (erro) {
            throw erro;
        }

        const gruposSql = "SELECT * FROM grupos";
        conexao.query(gruposSql, (erro, grupos) => {
            if (erro) {
                throw erro;
            }
            response.render('pesquisa', { produtos: produtos, grupos: grupos, filtrosAplicados: true });
        });
    });
});

app.get("/pesquisa", (request, response) => {
    const sql = "SELECT * FROM grupos";
    conexao.query(sql, (erro, retorno) => {
        if (erro) {
            throw erro;
        }
        response.render("pesquisa", { grupos: retorno });
    });
});

app.get("/estoque", (request, response) => {
    const sql = "SELECT * FROM produtos";
    conexao.query(sql, (erro, produtos) => {
        if (erro) {
            throw erro;
        }
        response.render("estoque", { produtos: produtos });
    });
});

app.post("/movimentar-estoque", (request, response) => {
    const { produtoId, tipoMovimento, quantidade } = request.body;
    const sinal = tipoMovimento === 'entrada' ? '+' : '-';

    const sql = `UPDATE produtos SET saldo_estoque = saldo_estoque ${sinal} ? WHERE codigo = ?`;
    conexao.query(sql, [quantidade, produtoId], (erro, retorno) => {
        if (erro) {
            throw erro;
        }

        response.redirect("/estoque");
    });
});

app.post("/cadastrar-grupo", (request, response) => {
    const codigo = request.body.codigo;
    const nome = request.body.nomeGrupo;
    const descricao = request.body.descricaoGrupo;

    const sql = `INSERT INTO grupos (codigo_grupo, descricao, nome)
     VALUES ('${codigo}', '${descricao}', '${nome}')`;

    conexao.query(sql, (erro, retorno) => {
        if (erro) {
            throw erro;
        }

        console.log(retorno);
    });

    response.redirect("/");
    response.end();
});

app.post("/cadastrar-produto", (request, response) => {
    const nome = request.body.nomeProd;
    const descricao = request.body.descricaoProd;
    const saldo_estoque = request.body.saldoEstoque;
    const codigo_grupo = request.body.codigoGrupo;

    const sql = `INSERT INTO produtos (descricao, codigo_grupo, saldo_estoque, nome) 
    VALUES ('${descricao}', '${codigo_grupo}', ${saldo_estoque}, '${nome}')`;

    conexao.query(sql, (erro, retorno) => {
        if (erro) {
            throw erro;
        }

        console.log(retorno);
    });

    response.redirect("/");
    response.end();
});

app.listen(8080, () => {
    console.log("Servidor rodando na porta 8080");
});
