export default function SafeJSON(props: any, endpoint: any, exception?: any, index?: number) {
    endpoint = endpoint.split(".");
    if (endpoint.length == 0) {
        return exception == null ? "" : exception;
    }
    if (index == null) {
        index = 0;
    }
    if (props == null) {
        return exception == null ? "" : exception;
    }
    if (props[endpoint[index]] == null) {
        return exception == null ? "" : exception;
    }
    props = props[endpoint[index]];
    index += 1;
    if (index == endpoint.length) {
        return props;
    }
    return SafeJSON(props, endpoint.join("."), exception, index);
}
