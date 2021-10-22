import Text from "./Text";

const Button = ({onClick, name}) => {
    return (<button onClick={onClick} className={'px-4 mt-4 md:mt-4 sm:mt-4 py-3 sm:ml-2 lg:self-end rounded-md' +
    ' border-opacity-50' +
    ' bg-blue-600' +
    ' text-white'}>
        <Text tag={'span'}>{name}</Text>
    </button>)
}

export default Button