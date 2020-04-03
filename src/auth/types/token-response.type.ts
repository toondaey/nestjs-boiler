export type TokenResponse = TokenResponseMeta & {
    token: string;
}

export type TokenResponseMeta = {
    _meta: {
        type: string;
        expiresIn: string;
        validFor: string;
    }
}
