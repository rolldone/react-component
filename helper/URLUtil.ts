const URLUtil = {
    render(path: string, query?: any, hash?: any) {
        // Remove duplicate slashes in the path
        const cleanPath = path.replace(/\/{2,}/g, '/');

        // Remove trailing slash at the end of the path
        const trimmedPath = cleanPath.replace(/\/$/, '');

        // Add a leading slash if the path doesn't start with one
        const formattedPath = trimmedPath.startsWith('/') ? trimmedPath : `/${trimmedPath}`;

        // Build the query string
        let queryString = '';
        if (query && typeof query === 'object') {
            const params = Object.entries(query)
                .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as any)}`);
            queryString = params.join('&');
        }

        // Combine the cleaned path, query string, and hash fragment
        let url = formattedPath;
        if (queryString) {
            url += `?${queryString}`;
        }
        if (hash) {
            url += `#${encodeURIComponent(hash)}`;
        }

        return url;
    },

    parseUrl(urlString: string) {
        const url = new URL(urlString);

        const query = Object.fromEntries(url.searchParams);
        const hash = url.hash.substring(1); // Remove the leading '#'

        return {
            protocol: url.protocol,
            host: url.host,
            path: url.pathname,
            query,
            hash
        };
    }
};

export default URLUtil;