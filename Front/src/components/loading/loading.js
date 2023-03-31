import React from "react";
import { SpinnerDotted } from 'spinners-react';
import a from "./loading.module.css"

export default function Loading(){

    return (
        <div className={a.fatherLoading}>
            <div className={a.loading}>
            <SpinnerDotted size={49} thickness={99} speed={100} color="rgba(172, 57, 57, 1)" />
            </div>
        </div>
    )
}
 