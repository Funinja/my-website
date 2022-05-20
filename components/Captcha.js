import Proptypes from "prop-types";
import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY;

export default function ReCaptcha(){

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [processing, setProcessing] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [submit, setSubmit] = useState("REGISTER");
    const [result, setResult] = useState({});

    useEffect(() =>{
        setSubmit(() => {
            if (completed) return "RESET";
            if (processing) return "PROCESSING";
            return "REGISTER";
        })
    }, [processing, completed])

    const handleSubmit = (e) => {
        e.preventDefault();

        if(completed) {

        }
    }

}