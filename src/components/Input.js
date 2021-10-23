const Input = ({type, value, onChange}) => {

    const inputStyle = (type = 'text') => {
        return (
            {
                'text': 'border',
                'datetime-local': 'block border-2 w-full border-blue-900 p-2',
                'time': 'block w-full border-2 border-gray-900 p-2 mt-2 sm:m-0'
            }[type] || 'text'
        )
    }

    return (<input data-testid="input" type={type} onChange={onChange} value={value} className={inputStyle(type)}/>)
}

export default Input