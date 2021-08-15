export function withProps(Component, props) {
    return function(matchProps) {
        return <Component {...props} {...matchProps} />
    }
}