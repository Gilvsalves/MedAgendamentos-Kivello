import {db} from "../db.js"

//-----------------------------------------------------------------------------------------------//

export const getUsers = (_, res) => {
    const q = "SELECT * FROM pacientes";

    db.query(q, (err, data) => {
        if (err) return res.json(err)

        return res.status(200).json(data)
    })
}

export const addUser = (req, res) => {
    const { nome, sobrenome, cpf, telefone, email, senha } = req.body;

    const sql = 'INSERT INTO pacientes (nome, sobrenome, cpf, telefone, email, senha) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [nome, sobrenome, cpf, telefone, email, senha];

    db.query(sql, values, (err, result) => {
        if (err) {
        console.error('Erro ao inserir paciente:', err);
        res.status(500).send('Erro ao inserir paciente');
        } else {
        res.status(201).send('Paciente cadastrado com sucesso');
        }
    });
}

export const updateUser = (req, res) => {
    const q = "UPDATE usuarios SET `nome` = ?, `email` = ?, `fone` = ?, `data_nascimento` = ? WHERE `id` = ?"

    const values = [
        req.body.nome,
        req.body.email,
        req.body.fone,
        req.body.data_nascimento,
    ];

    db.query(q,[...values, req.params.id], (err) =>{
        if (err) return res.json(err);

        return res.status(200).json("Usuário atualizado com sucesso.")
    })

}

export const deleteUser = (req, res) => {
    const q = "DELETE FROM usuarios WHERE `id` = ?"

    db.query(q, [req.params.id], (err) => {
        if(err) return res.json(err)

        return res.status(200).json("Usuário deletado com sucesso.")
    })
}

//-----------------------------------------------------------------------------------------------//