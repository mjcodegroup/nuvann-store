import * as jose from 'jose'; // Import the 'jose' library

class Token {
    decodeToken(token: string) {
        return jose.decodeJwt(token);
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default  new Token();