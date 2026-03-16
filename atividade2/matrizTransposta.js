function transporMatriz(A) {

    console.log("Matriz original:");
    console.table(A);

    let linhas = A.length;
    let colunas = A[0].length;

    let transposta = [];

    for (let i = 0; i < colunas; i++) {
        transposta[i] = [];
        for (let j = 0; j < linhas; j++) {
            transposta[i][j] = A[j][i];
        }
    }

    console.log("Matriz transposta:");
    console.table(transposta);
}

// Exemplo de teste
let A = [
    [1, 2],
    [3, 4],
    [5, 6]
];

transporMatriz(A);