const Link = ({href,target, children}) => {
    return (<a className={'text-blue-500'} target={target} href={href}>{children}</a>)
}

export default Link