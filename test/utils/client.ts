import ApolloClient from "apollo-boost";

export function apolloClient(uri?: string, headers?: Record<string, any> ) {
    return new ApolloClient({
        uri,
        request: op => {
            op.setContext({ headers });
        },
        onError: e => console.log(e)
    });
}
