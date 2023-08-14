const divPromise = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Calculando ${a} / ${b}`);
            if (b === 0){
                reject(new Error("Error: Div entre 0"));
            }else {
                resolve(a / b);
            }
        }), 3000;
    });
}

const divAsync = async (a, b) => {
    if(b === 0){
        throw new Error("Error: Div entre 0");
    }else {
        return a / b;
    }
}

console.log("----- Antes de la promesa -----");

/* divAsync(2, 3)
    .then((result) => {
        console.log(`El resultado 01 es: ${result}`);
        return divAsync(result, 5);
    })
    .then((result) => {
        console.log(`El resultado 02 es: ${result}`)
        return divAsync(result, 0);
    })
    .catch((error) => {
        console.error(error.message);
    }) */

console.log("----- Después de la promesa -----");

const main = async () => {

    const numbersArr = [1, 3, 5, 4, 8, 0];
    let acc = numbersArr[0];

    await numbersArr.forEach(async (n) => {
        try{
            await new Promise(done => setTimeout(() => done(), 10));
            acc = await divAsync(acc, n);
            console.log(`El resultado es: ${acc}`);
        }catch (err){
            console.error(err.message);
        }        
    });
}

main();