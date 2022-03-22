const calculateTotal = (number1: number, number2: number) => {
    const result = number1 * number2;
    const indexOfDot = result.toString().split('').findIndex((symb) => symb === '.')
    
    const cuttedNumber = result.toString().slice(0, indexOfDot + 5)

    return cuttedNumber;
}

export default calculateTotal;