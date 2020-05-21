import { Container } from "@material-ui/core";
import classNames from "classnames";
import React, { useState, useEffect }from "react";
import styles from './Banner.module.scss';
import {PushpinOutlined} from '@ant-design/icons';

export default function Banner(props){
    const [isVisible, setVisibility] = useState("isVisible" in props ? props.isVisible : true);
    useEffect(() => {
        if ("isVisible" in props && props.isVisible !== isVisible) {
            setVisibility(props.isVisible);
        }
    }, [props.isVisible, isVisible])

    const handleClose = (e) => {
        setVisibility(false);
        if (props.onClose) props.onClose(e);
    }

    useEffect(() => {
        document.addEventListener("scroll", scrollListener);
        return () => {
            document.removeEventListener("scroll", scrollListener);
        };
    });

    let [isScrolling, setScrolling] = useState(false);
    const scrollListener = () => {
        if (document.scrollingElement) {
            setScrolling(document.scrollingElement.scrollTop > 5);
        }
    };

    const classes = classNames(styles.container, 
        { [styles.scrolling]: isScrolling });
    const hasGutter = "gutterTop" in props ? props.gutterTop : false;
    return (
        <Container className={classes} maxWidth={false} style={{ display: isVisible ? "flex" : "none"}}>
            <div className={styles.content}>{props.children}</div>
            <div className={styles.close} onClick={handleClose}>x</div>
        </Container>
    );
}

function ShutDownBanner() {
    return (
        <Banner>
            <div className={styles.covidBannerText}>
            <PushpinOutlined /> &nbsp; Likewise will be suspending all operations by June 1st, 2020 (all personal data will be destroyed)
            </div>
        </Banner>
    )
}

export {ShutDownBanner};
