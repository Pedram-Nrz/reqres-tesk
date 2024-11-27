import "server-only";
import type {JWTPayload} from "jose";
import {SignJWT, jwtVerify} from "jose";
import {cookies} from "next/headers";


const SecretKey = process.env.SESSION_SECRET;
const EncodedKey = new TextEncoder().encode(SecretKey);

export async function signSession(payload:JWTPayload){

    try{

        return new SignJWT(payload)
        .setProtectedHeader({alg:'HS256'})
        .setIssuedAt()
        .setExpirationTime("1 h")
        .sign(EncodedKey);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }catch(e){
        console.debug("Error<SessionHandler|signSession>: Failed to sign a session");
    }

}

export async function verifySession(session:string){

    try{

        const {payload} = await jwtVerify(session,EncodedKey,{algorithms:['HS256']});

        return payload;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }catch(e){
        console.debug("Error<SessionHandler|VerifySession>: Failed to verify a session");
    }

}

export async function createSession(userToken:string){
    const cookie = await cookies();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
    const session = await signSession({userToken, expiresAt});

    if(session){
        cookie.set("session",session,{
            httpOnly:true,
            expires:expiresAt,
            secure:process.env.NODE_ENV === 'production',
        });
    }

}

export async function deleteSession(){
    const cookie = await cookies();

    if(cookie.has("session")){
        cookie.delete("seesion");
    }
}