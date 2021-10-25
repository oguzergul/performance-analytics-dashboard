const Grid = ({direction, children, sm, lg, gap}) => {
    return (
        <div className={`grid grid-${direction}-${sm} sm:grid-${direction}-${lg} gap-${gap} mt-4`}>
            {children}
        </div>
    )
}
export default Grid