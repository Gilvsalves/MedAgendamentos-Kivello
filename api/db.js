import mysql from "mysql"

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "medproject"
})

// Verifica a conexão com o banco ao iniciar
db.connect((err) => {
    if (err) {
      console.error('Erro ao conectar no banco de dados:', err.message);
      process.exit(1); // Finaliza o servidor em caso de erro
    } else {
      console.log('Conexão com a database bem sucedida! :)');
    }
  });
