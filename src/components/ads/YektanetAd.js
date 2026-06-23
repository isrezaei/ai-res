"use client";

import React, { useEffect, useRef } from "react";
import { Stack } from "@chakra-ui/react";

export default function YektanetAd({ adId, height = 250 }) {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!adId || !containerRef.current) return;

        containerRef.current.innerHTML = "";

        const adDiv = document.createElement("div");
        adDiv.id = adId;
        containerRef.current.appendChild(adDiv);

        if (!window.yektanet) {
            const script = document.createElement("script");
            script.innerHTML = `
        !function(e,t,n){e.yektanetAnalyticsObject=n,e[n]=e[n]||function(){e[n].q.push(arguments)},e[n].q=e[n].q||[];var a=t.getElementsByTagName("head")[0],r=new Date,c="https://cdn.yektanet.com/superscript/EJAFdwBN/native-no-data-44496/yn_pub.js?v="+r.getFullYear().toString()+"0"+r.getMonth()+"0"+r.getDate()+"0"+r.getHours(),s=t.createElement("link");s.rel="preload",s.as="script",s.href=c,a.appendChild(s);var l=t.createElement("script");l.async=!0,l.src=c,a.appendChild(l)}(window,document,"yektanet");
      `;
            document.head.appendChild(script);
        }
    }, [adId]);

    return (
        <Stack>
            <div
                ref={containerRef}
                style={{
                    width: "100%",
                    minHeight: `${height}px`,
                    borderRadius: "10px",
                    overflow: "hidden",
                }}
            />
        </Stack>
    );
}
