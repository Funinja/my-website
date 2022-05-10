import { NextResponse } from 'next/server';

export function middleware(req, ev) {

    const { cookies, url } = req;

    const jwt = cookies.CatJWT;
    const URL_path = req.nextUrl.clone();

    // console.log('My jwt', jwt);

    if(url.includes("/cat/intro")){
        if(jwt !== undefined){
            URL_path.pathname='/cat/dashboard/defaultPage';
            return NextResponse.rewrite(URL_path);
        }
    }else if(url.includes("/cat/dashboard")){
        if(jwt === undefined){
            URL_path.pathname='/cat/intro';
            return NextResponse.rewrite(URL_path);
        }

    }

    return NextResponse.next();
}