export function withProps(Component, props) {
    return function(matchProps) {
        return <Component {...props} {...matchProps} />
    }
}

export function capitalizeWord(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function getPaddedDexNumber(nationalDexNumber) {
    let str = "00" + nationalDexNumber;
    return str.substring(str.length - 3, str.length);
}

export function prettyEnum(e) {
    let tokens = e.split("_");

    for(var token in tokens) {
        tokens[token] = capitalizeWord(tokens[token]);
    }

    return tokens.join(" ");
}