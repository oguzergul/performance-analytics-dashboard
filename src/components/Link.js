const Link = ({href,target, children}) => {
    return (<a className={'text-blue-500 mt-2'} target={target} href={href}>{children}</a>)
}

export default Link