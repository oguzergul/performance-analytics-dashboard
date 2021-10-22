const Grid = ({direction, children, sm, lg, gap}) => {

    const gridStyle = (direction = 'text') => {
        return (
            {
                column: `grid grid-cols-${sm} sm:grid-cols-${lg} gap-${gap} mt-4`,
                row: 'block border-2 w-full border-gray-900 p-2',
            }[direction] || 'column'
        )
    }

    return (
        <div className={gridStyle(direction)}>
            {children}
        </div>
    )
}
export default Grid