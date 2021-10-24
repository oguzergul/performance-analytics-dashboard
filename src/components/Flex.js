const Flex = ({layouts = [], align = [], justify = [], children, className}) => {
    return (
        <div className={[`
        flex
        flex-1
        flex-${layouts[0]}
        sm:flex-${layouts[1]} 
        md:flex-${layouts[2]} 
        lg:flex-${layouts[3]}
        xs:justify-${justify[0]} 
        sm:justify-${justify[1]} 
        md:justify-${justify[2]} 
        lg:justify-${justify[3]} 
        items-${align[0]} 
        items-${align[1]} 
        items-${align[2]} 
        items-${align[3]} 
        ${className}
        `]}>
            {children}
        </div>
    )
}
export default Flex