import classnames from 'classnames';

const Input = ({type, value, onChange}) => {

    return (<input data-testid="input" type={type} onChange={onChange} value={value}
                   className={
                       classnames({
                           "border": type === 'text',
                           "block border-2 w-full border-blue-900 p-2": type === 'datetime-local',
                           "block w-full border-2 border-gray-900 p-2 mt-2 sm:m-0": type === "time"
                       })}/>)
}

export default Input