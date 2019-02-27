const mustBeCSV = value => {
    const exploded = (value || '').split('.')[1] || ''
    return (exploded.toLowerCase() !== 'csv')
}

export default mustBeCSV