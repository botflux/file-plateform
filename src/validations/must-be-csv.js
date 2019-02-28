const mustBeCSV = value => {
    return (value.match(/(.(c|C)(s|S)(v)|V)$/g) !== null)
}

export default mustBeCSV