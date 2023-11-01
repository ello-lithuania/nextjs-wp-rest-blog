import styles from './layout.module.css'
import Header from './header.js'
import Footer from './footer.js'
import axios from "axios";
import { useState,useEffect } from "react";

export default function Layout({ children }) {

    const [siteInfo, setSiteInfo] = useState({
        data: {
            name: 'Loading ...'
        }
    });

    useEffect(() => {
        let root_url = process.env.NEXT_PUBLIC_WP_JSON_URL+'/?_fields=name';

        axios.get(root_url).then((response) => {
            setSiteInfo(response)
        })
    },[]);

    return (
    <>
        <Header sitedata={siteInfo}/>
        <div /*className={styles.container}*/>{children}</div>
        <Footer sitedata={siteInfo}/>
    </>
    );
}