import { NextResponse } from 'next/server';

export function middleware(req, ev) {

    const { cookies, url } = req;
    const jwt = cookies.CatJWT;
    const URL_path = req.nextUrl.clone();

    if (jwt === undefined){
        if(url.includes("/cat/dashboard")){
            URL_path.pathname='/cat/intro';
            return NextResponse.rewrite(URL_path);
        }

    }else{
        if(url.includes("/cat/intro") || url.includes("/cat/login") || url.includes("/cat/signup")){
            URL_path.pathname='/cat/dashboard/defaultPage';
            return NextResponse.rewrite(URL_path);
        }
    }

    return NextResponse.next();
}